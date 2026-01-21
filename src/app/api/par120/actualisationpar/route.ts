import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/showDataPar`;
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
export async function PUT(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const donner = await request.json();
  const link = `${lien_dt}/updateParTrack`;
  const res = await fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ donner }),
  });
  const data = await res.json();
  return NextResponse.json({
    data,
    status: res.status,
  });
}
export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();
  const link = `${lien_dt}/updateParTrackFile`;
  const res = await fetch(link, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ data }),
  });
  const response = await res.json();
  return NextResponse.json({
    data: response,
    status: res.status,
  });
}
