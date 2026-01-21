import { IRegion } from "@/app/interface/settings/Other";
import { lien } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien}/zone`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const reponse = await res.json();
  if (res.status === 200) {
    const donner: IRegion[] = reponse;
    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
