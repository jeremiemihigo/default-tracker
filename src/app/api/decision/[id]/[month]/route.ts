import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; month: string }> }
) {
  const token = req.cookies.get("access")?.value;
  const { id, month } = await context.params;

  const res = await fetch(`${lien_dt}/readDecisionArbitrage/${id}/${month}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json({ data, status: res.status });
}
