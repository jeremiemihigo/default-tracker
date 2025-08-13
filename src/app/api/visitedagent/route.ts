import { IVisitedAgent } from "@/app/interface/TClient";
import { capitalize } from "@/app/static/functions";
import { lien_dt } from "@/app/static/lien";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/customerToRefresh`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (res.status === 200) {
    const data: IVisitedAgent[] = await res.json();
    const donner = data.map((index) => {
      return {
        customer_id: index.customer_id,
        customer_name: capitalize(index.customer_name),
        shop: index.shop,
        par: index.par,
        Date_Save: moment(index.dateSave).format("DD MMMM YYYY"),
        feedback: capitalize(index.feedback),
        Id_who_had_visited: index.Id_who_had_visited,
        agent_who_had_visited: capitalize(index.agent_who_had_visited),
        Feedback_call: capitalize(index.Feedback_call),
      };
    });

    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
