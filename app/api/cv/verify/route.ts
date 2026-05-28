import { NextResponse } from "next/server";
import { cvTokenTtlSeconds, issueCvToken } from "../../../../lib/cvAccess";
import { verifyCvOtpRequest } from "../../../../lib/cvStore";

const OTP_MAX_ATTEMPTS = 5;

function isEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; requestId?: string; otp?: string };
    const email = body?.email?.trim().toLowerCase() ?? "";
    const requestId = body?.requestId?.trim() ?? "";
    const otp = body?.otp?.trim() ?? "";

    if (!isEmailValid(email) || !requestId || !/^\d{6}$/.test(otp)) {
      return NextResponse.json({ error: "Invalid verification input." }, { status: 400 });
    }

    const result = await verifyCvOtpRequest(requestId, otp, OTP_MAX_ATTEMPTS);
    if (result.ok === false) {
      return NextResponse.json({ error: result.reason }, { status: 401 });
    }

    if (result.email !== email) {
      return NextResponse.json(
        { error: "Email does not match verification request." },
        { status: 401 }
      );
    }

    const token = issueCvToken(email);
    const url = `/cv/view?token=${encodeURIComponent(token)}`;

    return NextResponse.json({
      url,
      expiresInSeconds: cvTokenTtlSeconds,
    });
  } catch (error) {
    const message =
      error instanceof Error &&
      (error.message.includes("CV_ACCESS_SECRET") ||
        error.message.includes("UPSTASH_REDIS_REST_URL") ||
        error.message.includes("UPSTASH_REDIS_REST_TOKEN"))
        ? "Server configuration is incomplete. Set CV_ACCESS_SECRET, UPSTASH_REDIS_REST_URL, and UPSTASH_REDIS_REST_TOKEN."
        : "Verification failed. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
