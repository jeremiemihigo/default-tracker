import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ mois: string }> },
) {
  const token = request.cookies.get("access")?.value;
  const { mois } = await context.params;
  const link = `${lien_dt}/rapportDecisions/${mois}`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await res.json();
  const response = NextResponse.json({
    status: res.status,
    data: result,
  });
  return response;
}
