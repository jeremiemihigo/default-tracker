import { IAction } from "@/app/interface/IAction";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();
  const link = `${lien_dt}/validationAction`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ data }),
  });
  const result = await res.json();
  if (res.status === 200) {
    const response = NextResponse.json({
      status: res.status,
    });
    return response;
  } else {
    const response = NextResponse.json({
      data: result.data,
      status: res.status,
    });
    return response;
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/showAction`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (res.status === 200) {
    const data: IAction[] = await res.json();
    const response = NextResponse.json({
      data,
      status: res.status,
    });
    return response;
  }
}
