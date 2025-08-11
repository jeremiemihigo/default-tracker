import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/categorisationAutomatique`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  const response = NextResponse.json({
    data,
    status: res.status,
  });
  return response;
}
