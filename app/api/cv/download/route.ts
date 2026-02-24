import { readFile, stat } from "fs/promises";
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
    const cvMeta = await stat(cvPath);
    const pdfBuffer = await readFile(cvPath);

    await appendCvAudit({
      email: payload.email,
      ip: getClientIp(req),
      userAgent: req.headers.get("user-agent") || "unknown",
      endpoint: "download",
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(cvMeta.size),
        "Accept-Ranges": "bytes",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    const message = "Resume file is unavailable right now.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
