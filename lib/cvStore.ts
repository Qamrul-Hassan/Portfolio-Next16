import crypto from "crypto";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type MemoryRecord = { count: number; exp: number };
const memoryRateLimit = new Map<string, MemoryRecord>();
const memoryUsedTokens = new Map<string, number>();
type OtpMemoryRecord = {
  email: string;
  otpHash: string;
  attempts: number;
  exp: number;
};
const memoryOtp = new Map<string, OtpMemoryRecord>();
type CvAuditEntry = {
  email: string;
  ip: string;
  userAgent: string;
  endpoint: "download" | "data";
  timestamp: string;
};
const memoryAudit: CvAuditEntry[] = [];

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function isRedisConfigured() {
  return Boolean(redisUrl && redisToken);
}

function assertStoreConfigured() {
  if (isProduction() && !isRedisConfigured()) {
    throw new Error(
      "Production CV protection requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }
}

async function redisCommand(pathSegments: string[], query?: Record<string, string | number>) {
  if (!redisUrl || !redisToken) return null;

  const encodedPath = pathSegments.map((item) => encodeURIComponent(item)).join("/");
  const url = new URL(`${redisUrl.replace(/\/$/, "")}/${encodedPath}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis command failed (${response.status}).`);
  }

  const data = (await response.json()) as { result?: unknown };
  return data.result;
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function cleanupMemoryMap(nowMs: number) {
  for (const [key, record] of memoryRateLimit.entries()) {
    if (record.exp <= nowMs) memoryRateLimit.delete(key);
  }
  for (const [key, exp] of memoryUsedTokens.entries()) {
    if (exp <= nowMs) memoryUsedTokens.delete(key);
  }
  for (const [key, record] of memoryOtp.entries()) {
    if (record.exp <= nowMs) memoryOtp.delete(key);
  }
}

export async function checkAndConsumeCvToken(token: string, ttlSeconds: number) {
  assertStoreConfigured();

  const tokenHash = hashToken(token);
  const key = `cv:used:${tokenHash}`;

  if (isRedisConfigured()) {
    const result = await redisCommand(["set", key, "1"], { NX: "true", EX: ttlSeconds });
    return result === "OK";
  }

  const now = Date.now();
  cleanupMemoryMap(now);
  if (memoryUsedTokens.has(key)) return false;
  memoryUsedTokens.set(key, now + ttlSeconds * 1000);
  return true;
}

export async function isCvRateLimited(clientKey: string, limit: number, windowSeconds: number) {
  assertStoreConfigured();
  const key = `cv:rl:${clientKey}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;

  if (isRedisConfigured()) {
    const count = Number(await redisCommand(["incr", key]));
    if (count === 1) {
      await redisCommand(["expire", key, String(windowSeconds + 30)]);
    }
    return count > limit;
  }

  const now = Date.now();
  cleanupMemoryMap(now);
  const rec = memoryRateLimit.get(key);
  if (!rec || rec.exp <= now) {
    memoryRateLimit.set(key, { count: 1, exp: now + windowSeconds * 1000 });
    return false;
  }
  rec.count += 1;
  memoryRateLimit.set(key, rec);
  return rec.count > limit;
}

export async function createCvOtpRequest(
  requestId: string,
  email: string,
  otpCode: string,
  ttlSeconds: number
) {
  assertStoreConfigured();
  const key = `cv:otp:${requestId}`;
  const payload = JSON.stringify({
    email,
    otpHash: hashValue(otpCode),
    attempts: 0,
  });

  if (isRedisConfigured()) {
    await redisCommand(["set", key, payload], { EX: ttlSeconds });
    return;
  }

  const now = Date.now();
  cleanupMemoryMap(now);
  memoryOtp.set(key, {
    email,
    otpHash: hashValue(otpCode),
    attempts: 0,
    exp: now + ttlSeconds * 1000,
  });
}

export async function verifyCvOtpRequest(
  requestId: string,
  otpCode: string,
  maxAttempts: number
): Promise<{ ok: true; email: string } | { ok: false; reason: string }> {
  assertStoreConfigured();
  const key = `cv:otp:${requestId}`;
  const inputHash = hashValue(otpCode);

  if (isRedisConfigured()) {
    const stored = await redisCommand(["get", key]);
    if (!stored || typeof stored !== "string") {
      return { ok: false, reason: "OTP request expired. Please request a new code." };
    }

    let parsed: { email?: string; otpHash?: string; attempts?: number };
    try {
      parsed = JSON.parse(stored) as { email?: string; otpHash?: string; attempts?: number };
    } catch {
      return { ok: false, reason: "OTP data invalid. Please request a new code." };
    }

    const attempts = Number(parsed.attempts ?? 0);
    if (attempts >= maxAttempts) {
      await redisCommand(["del", key]);
      return { ok: false, reason: "Too many invalid attempts. Request a new code." };
    }

    if (!parsed.otpHash || !parsed.email) {
      await redisCommand(["del", key]);
      return { ok: false, reason: "OTP data invalid. Please request a new code." };
    }

    if (parsed.otpHash !== inputHash) {
      const next = JSON.stringify({
        email: parsed.email,
        otpHash: parsed.otpHash,
        attempts: attempts + 1,
      });
      await redisCommand(["set", key, next], { EX: 10 * 60 });
      return { ok: false, reason: "Invalid verification code." };
    }

    await redisCommand(["del", key]);
    return { ok: true, email: parsed.email };
  }

  const now = Date.now();
  cleanupMemoryMap(now);
  const record = memoryOtp.get(key);
  if (!record) {
    return { ok: false, reason: "OTP request expired. Please request a new code." };
  }
  if (record.attempts >= maxAttempts) {
    memoryOtp.delete(key);
    return { ok: false, reason: "Too many invalid attempts. Request a new code." };
  }
  if (record.otpHash !== inputHash) {
    record.attempts += 1;
    memoryOtp.set(key, record);
    return { ok: false, reason: "Invalid verification code." };
  }
  memoryOtp.delete(key);
  return { ok: true, email: record.email };
}

export async function appendCvAudit(entry: CvAuditEntry, keepLatest = 300) {
  assertStoreConfigured();
  const key = "cv:audit";
  const data = JSON.stringify(entry);

  if (isRedisConfigured()) {
    await redisCommand(["lpush", key, data]);
    await redisCommand(["ltrim", key, "0", String(Math.max(keepLatest - 1, 0))]);
    return;
  }

  memoryAudit.unshift(entry);
  if (memoryAudit.length > keepLatest) memoryAudit.length = keepLatest;
}

export async function readCvAudit(limit = 50) {
  assertStoreConfigured();
  const normalizedLimit = Math.max(1, Math.min(limit, 300));

  if (isRedisConfigured()) {
    const rows = await redisCommand(["lrange", "cv:audit", "0", String(normalizedLimit - 1)]);
    if (!Array.isArray(rows)) return [];
    return rows
      .map((row) => {
        if (typeof row !== "string") return null;
        try {
          return JSON.parse(row) as CvAuditEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is CvAuditEntry => Boolean(entry));
  }

  return memoryAudit.slice(0, normalizedLimit);
}
