// import { lien_dt } from "@/app/static/lien";
import { IFeedback } from "@/app/interface/IFeedbacks";
import { IVerificationField } from "@/app/interface/TClient";
import { capitalize, returnFeedback } from "@/app/static/functions";
import { lien_dt } from "@/app/static/lien";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const data = await request.json();
  const link = `${lien_dt}/verification`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
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
        customer_name: capitalize(x.nomclient),
        shop: x.shop,
        region: x.region,
        par: x.par,
        Submited_By: capitalize(x.submitedBy),
        //Ancienne visite par fonction
        Feedback_last_vm: capitalize(
          x.vm_fonction
            ? returnFeedback(x.vm_fonction.demande.raison, allfeedbacks)
            : "No_visits"
        ),
        date_last_vm: x.vm_fonction
          ? x.vm_fonction.demande.updatedAt
          : "No_visits",
        agent_last_vm: capitalize(
          x.vm_fonction ? x.vm_fonction.demandeur.nom : "No_visits"
        ),
        //visite categorisation
        last_vm_categorie_date: x.visite_categori
          ? x.visite_categori.demande.updatedAt
          : "No_visits",
        last_vm_categorie_agent: capitalize(
          x.visite_categori ? x.visite_categori.demandeur.nom : "No_visits"
        ),
        last_vm_for_categorie_id: x.visite_categori
          ? x.visite_categori.demandeur.codeAgent
          : "No_visits",
        feedback_call: capitalize(
          x.last_call
            ? returnFeedback(x.last_call.sioui_texte, allfeedbacks)
            : "No_calls"
        ),
        currentFeedback: x.currentFeedback,
        In_charge: returnIncharge(x)?.join(";"),
      };
    });
    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
