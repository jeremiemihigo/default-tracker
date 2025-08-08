// import { lien_dt } from "@/app/static/lien";
import { IFeedback } from "@/app/interface/IFeedbacks";
import { IVisite } from "@/app/interface/IVisites";
import { IArbitration } from "@/app/interface/TClient";
import { returnFeedback } from "@/app/static/functions";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/arbitrage`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (res.status === 200) {
    const data = await res.json();
    const arbitrage: IArbitration[] = data.result;
    const allfeedback: IFeedback[] = data.feedbacks;

    const returnvisite = (visites: IVisite[], type: string[]) => {
      if (
        visites.filter((x) => type.includes(x.demandeur.fonction)).length > 0
      ) {
        const v = visites.filter((x) => type.includes(x.demandeur.fonction));
        const { demande } = v[v.length - 1];
        return returnFeedback(demande.raison, allfeedback);
      } else {
        return "No_visits";
      }
    };
    const donner = arbitrage.map((x) => {
      return {
        ...x,
        appel: x.last_call?.sioui_texte
          ? returnFeedback(x.last_call?.sioui_texte, allfeedback)
          : "",
        currentFeedbacks: returnFeedback(x.currentFeedback, allfeedback),
        last_vm_agent:
          x?.visites.length > 0
            ? returnvisite(x.visites, ["agent", "tech"])
            : "No_visits",
        last_vm_rs:
          x?.visites.length > 0
            ? returnvisite(x.visites, ["RS", "TL"])
            : "No_visits",
        last_vm_po:
          x?.visites.length > 0 ? returnvisite(x.visites, ["PO"]) : "No_visits",
      };
    });

    return NextResponse.json({ data: donner, status: res.status });
  }

  return NextResponse.json(
    { error: "Failed to fetch", status: res.status },
    { status: res.status }
  );
}
