import { NextResponse } from "next/server";
import { readCvAudit } from "../../../../lib/cvStore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key") || "";
  const limit = Number(searchParams.get("limit") || "50");

  if (!process.env.CV_AUDIT_KEY) {
    return NextResponse.json(
      { error: "Server configuration is incomplete. Set CV_AUDIT_KEY." },
      { status: 500 }
    );
  }

  if (key !== process.env.CV_AUDIT_KEY) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const logs = await readCvAudit(limit);
  return NextResponse.json({ logs }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
