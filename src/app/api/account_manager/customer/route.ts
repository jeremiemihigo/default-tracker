import { account_manager } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token_global")?.value;
  const link = `${account_manager}/readAllCustomer`;
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
