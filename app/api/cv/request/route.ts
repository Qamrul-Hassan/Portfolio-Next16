import crypto from "crypto";
import { NextResponse } from "next/server";
import { createCvOtpRequest, isCvRateLimited } from "../../../../lib/cvStore";
import { sendCvOtpEmail } from "../../../../lib/cvEmail";

const MAX_REQUESTS_PER_15_MIN = 5;
const WINDOW_SECONDS = 15 * 60;
const OTP_TTL_SECONDS = 10 * 60;

function getClientKey(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

function isEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = body?.email?.trim().toLowerCase() ?? "";
    if (!isEmailValid(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const key = getClientKey(req);
    const limited = await isCvRateLimited(key, MAX_REQUESTS_PER_15_MIN, WINDOW_SECONDS);
    if (limited) {
      return NextResponse.json(
        { error: "Too many resume requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const requestId = crypto.randomBytes(16).toString("hex");
    const otpCode = String(crypto.randomInt(100000, 999999));
    await createCvOtpRequest(requestId, email, otpCode, OTP_TTL_SECONDS);
    const delivery = await sendCvOtpEmail({
      toEmail: email,
      otpCode,
      minutesValid: Math.floor(OTP_TTL_SECONDS / 60),
    });

    return NextResponse.json({
      requestId,
      expiresInSeconds: OTP_TTL_SECONDS,
      ...(process.env.NODE_ENV !== "production" ? { delivery } : {}),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production" && error instanceof Error) {
      console.error("CV OTP request error:", error.message);
    }

    if (error instanceof Error && error.message.includes("Missing SMTP configuration")) {
      return NextResponse.json(
        {
          error:
            "OTP email is not configured. Set SMTP_USER, SMTP_PASS (Gmail App Password), and SMTP_FROM in .env, then restart dev server.",
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message.includes("Failed to send OTP email")) {
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV !== "production"
              ? `OTP email send failed: ${error.message}`
              : "OTP email could not be delivered. Check EmailJS service/template configuration.",
        },
        { status: 500 }
      );
    }

    const message =
      error instanceof Error &&
      (error.message.includes("CV_ACCESS_SECRET") ||
        error.message.includes("UPSTASH_REDIS_REST_URL") ||
        error.message.includes("UPSTASH_REDIS_REST_TOKEN"))
        ? "Server configuration is incomplete. Set CV_ACCESS_SECRET, UPSTASH_REDIS_REST_URL, and UPSTASH_REDIS_REST_TOKEN."
        : "Unable to process resume request right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
