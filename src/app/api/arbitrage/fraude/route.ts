// import { lien_dt } from "@/app/static/lien";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/readDecisionArbitrage/D7UNY`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    return NextResponse.json({ data, status: res.status });
  }

  return NextResponse.json(
    { error: "Failed to fetch", status: res.status },
    { status: res.status }
  );
}
