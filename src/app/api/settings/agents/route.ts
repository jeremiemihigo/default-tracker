import { IAgent } from "@/app/interface/settings/IAgent";
import { capitalize } from "@/app/static/functions";
import { lien } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien}/agent`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });

  const reponse = await res.json();
  const donner: IAgent[] = reponse;
  const formating = donner.map((item) => {
    return {
      ...item,
      _id: item._id,
      ID: item.codeAgent,
      Name: capitalize(item.nom),
      Status: item.active ? "Actif" : "Inactif",
      Region: item.region.denomination,
      Shop: item.shop.length > 0 ? item.shop[0].shop : "",
      Contact: item.telephone,
      Fonction: capitalize(item.fonction),
      Edited_by: item.resetBy ? item.resetBy : "",
      Default_Password: item.first ? item.pass : "Just edited",
    };
  });
  const response = NextResponse.json({
    data: formating,
    status: res.status,
  });
  return response;
}
