import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();
  const link = `${lien_dt}/historique`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ codeclient: data }),
  });
  if (res.status === 200) {
    const data = await res.json();
    const response = NextResponse.json({
      data,
      status: res.status,
    });
    return response;
  }
}
