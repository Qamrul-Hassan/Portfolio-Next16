import crypto from "crypto";

type CvTokenPayload = {
  email: string;
  exp: number;
  nonce: string;
};

const CV_TOKEN_TTL_SECONDS = 15 * 60;

function getSecret() {
  const secret = process.env.CV_ACCESS_SECRET;
  if (!secret) {
    throw new Error("CV_ACCESS_SECRET is not configured.");
  }
  return secret;
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(data: string) {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function issueCvToken(email: string, ttlSeconds = CV_TOKEN_TTL_SECONDS) {
  const payload: CvTokenPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    nonce: crypto.randomBytes(16).toString("hex"),
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyCvToken(token: string): CvTokenPayload | null {
  const [encodedPayload, providedSignature] = token.split(".");
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = sign(encodedPayload);
  if (providedSignature.length !== expectedSignature.length) return null;

  const validSignature = crypto.timingSafeEqual(
    Buffer.from(providedSignature),
    Buffer.from(expectedSignature)
  );
  if (!validSignature) return null;

  let payload: CvTokenPayload;
  try {
    payload = JSON.parse(fromBase64Url(encodedPayload)) as CvTokenPayload;
  } catch {
    return null;
  }

  if (!payload?.email || !payload?.exp || !payload?.nonce) return null;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}

export const cvTokenTtlSeconds = CV_TOKEN_TTL_SECONDS;
