import { IPayement } from "@/app/interface/IOther";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();

  async function sendInBatches(data: IPayement[]) {
    const batchSize = 100; // ajuste selon ton besoin
    for (let i = 0; i < data.length; i += batchSize) {
      const chunk = data.slice(i, i + batchSize);
      const res = await fetch(`${lien_dt}/addpayements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: chunk }),
      });
      if (!res.ok) {
        console.error("Erreur sur le batch", i / batchSize, await res.text());
        break;
      }
    }
    return "done";
  }
  const result = sendInBatches(data);
  const response = NextResponse.json({
    data: result,
    status: 200,
  });
  return response;
}
export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/readPayment`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await res.json();
  const response = NextResponse.json({
    data: result,
    status: res.status,
  });
  return response;
}
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/deletePayement`;
  const res = await fetch(link, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });
  const result = await res.json();

  const response = NextResponse.json({
    data: result,
    status: res.status,
  });
  return response;
}
