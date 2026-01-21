// import { lien_dt } from "@/app/static/lien";
import { IFeedback } from "@/app/interface/IFeedbacks";
import { IVisite } from "@/app/interface/IVisites";
import { ITclient } from "@/app/interface/TClient";
import { capitalize } from "@/app/static/functions";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();
  const link = `${lien_dt}/individually`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    const data = await res.json();
    const { feedbacks, resultat } = data;
    const clients: ITclient[] = resultat;
    const returnFeedback = (id: string | undefined, sinon: string) => {
      if (feedbacks && feedbacks.length > 0) {
        if (
          feedbacks.filter((x: IFeedback) => x.idFeedback === id).length > 0
        ) {
          return feedbacks.filter((x: IFeedback) => x.idFeedback === id)[0]
            ?.title;
        } else {
          return sinon;
        }
      }
      // return 'No_visits';
    };
    const returnvisite = (visites: IVisite[], type: string[]) => {
      if (
        visites.filter((x) => type.includes(x.demandeur.fonction)).length > 0
      ) {
        const v = visites.filter((x) => type.includes(x.demandeur.fonction));
        const { demande } = v[v.length - 1];
        return returnFeedback(demande.raison, "No_visits");
      } else {
        return "No_visits";
      }
    };
    const returnIncharge = (x: ITclient) => {
      if (x.incharge && x.incharge?.length > 0) {
        return x.incharge.map(function (x) {
          return x.title;
        });
      }
      if (x.postes && x.postes?.length > 0) {
        return x.postes.map(function (x) {
          return x.title;
        });
      }
    };

    const donner = clients.map((x) => {
      return {
        actif: x.actif,
        idFeedback: x.currentFeedback,
        customer_id: x.codeclient,
        customer_name: capitalize(x.nomclient),
        par: x.par,
        region: x.region,
        shop: x.shop,
        Action: capitalize(x.action),
        submitedBy: capitalize(x.submitedBy),
        In_process: x.actif ? "In_Process" : "Done",
        Current_status: capitalize(x.tfeedback?.title),
        expected_cash: x.cashattendu ? "$" + x.cashattendu : "$0",
        cash_Pay: x.cashPayer ? "$" + x.cashPayer : "$0",
        Feedback_call: capitalize(
          returnFeedback(x.derniereappel?.sioui_texte, "No_calls") ||
            "No_calls",
        ),
        Feedback_PA_or_Tech: capitalize(
          x.visites?.length > 0
            ? returnvisite(x.visites, ["agent", "tech"])
            : "No_visits",
        ),

        zbm_rs_sm_tl: capitalize(
          x?.visites.length > 0
            ? returnvisite(x.visites, ["RS", "TL", "SM", "ZBM"])
            : "No_visits",
        ),
        Feedback_PO: capitalize(
          x?.visites.length > 0 ? returnvisite(x.visites, ["PO"]) : "No_visits",
        ),
        fullDate: x.fullDate,
        Decision: capitalize(x.statut_decision),
        In_charge: returnIncharge(x),
      };
    });
    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
