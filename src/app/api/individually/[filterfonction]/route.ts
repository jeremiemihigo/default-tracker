import { IFeedback } from "@/app/interface/IFeedbacks";
import { IVerificationField } from "@/app/interface/TClient";
import { returnFeedback } from "@/app/static/functions";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ filterfonction: string }> }
) {
  const token = request.cookies.get("access")?.value;
  const { filterfonction } = await context.params;
  const link = `${lien_dt}/dashboardAgent/${filterfonction}`;
  const data = await request.json();
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ data }),
  });
  if (res.status === 200) {
    const dataserver = await res.json();

    const data: IVerificationField[] = dataserver.data;
    const allfeedbacks: IFeedback[] = dataserver.allfeedbacks;

    const returnIncharge = (x: IVerificationField) => {
      if (x.departement.length > 0) {
        return x.departement.map(function (x) {
          return x.title + "; ";
        });
      }
      if (x.postes.length > 0) {
        return x.postes.map(function (x) {
          return x.title + "; ";
        });
      }
    };

    const donner = data.map((x) => {
      return {
        _id: x._id,
        customer_id: x.codeclient,
        customer_name: x.nomclient,
        shop: x.shop,
        region: x.region,
        par: x.par,
        submitedBy: x.submitedBy,
        //Ancienne visite par fonction
        feedback_last_vm: x.vm_fonction
          ? returnFeedback(x.vm_fonction.demande.raison, allfeedbacks)
          : "No_visits",
        date_last_vm: x.vm_fonction
          ? x.vm_fonction.demande.updatedAt
          : "No_visits",
        agent_last_vm: x.vm_fonction
          ? x.vm_fonction.demandeur.nom
          : "No_visits",
        //visite categorisation
        last_vm_categorie_date: x.visite_categori
          ? x.visite_categori.demande.updatedAt
          : "",
        last_vm_categorie_agent: x.visite_categori
          ? x.visite_categori.demandeur.nom
          : "",
        last_vm_for_categorie_id: x.visite_categori
          ? x.visite_categori.demandeur.codeAgent
          : "",
        feedback_call: x.last_call
          ? returnFeedback(x.last_call.sioui_texte, allfeedbacks)
          : "No_calls",
        currentFeedback: x.currentFeedback,
        submitedby: x.submitedBy,
        incharge: returnIncharge(x),
      };
    });
    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
