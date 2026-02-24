import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { verifyCvToken } from "../../../../lib/cvAccess";
import { appendCvAudit } from "../../../../lib/cvStore";

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";
  return forwardedFor.split(",")[0]?.trim() || "unknown";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json({ error: "Missing access token." }, { status: 400 });
    }

    const payload = verifyCvToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired resume link. Request a new one." },
        { status: 401 }
      );
    }

    const cvPath = path.join(process.cwd(), "private", "cv", "Qamrul_Hassan_Resume.pdf");
    const pdfBuffer = await readFile(cvPath);
    const base64 = Buffer.from(pdfBuffer).toString("base64");

    await appendCvAudit({
      email: payload.email,
      ip: getClientIp(req),
      userAgent: req.headers.get("user-agent") || "unknown",
      endpoint: "data",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { data: base64 },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Resume file is unavailable right now." }, { status: 500 });
  }
}
