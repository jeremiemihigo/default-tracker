import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/readDataRefresh`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
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
export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/Automatically_set`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
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
