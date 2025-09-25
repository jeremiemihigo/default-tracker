import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/rapportDecisions`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
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
