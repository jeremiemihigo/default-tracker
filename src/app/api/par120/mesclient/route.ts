import { IDataRefresh } from "@/app/interface/IOther";
import { lien_dt } from "@/app/static/lien";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const link = `${lien_dt}/mesclients`;
  const res = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    const donner = data.map((index: IDataRefresh) => {
      return {
        ...index,

        feedback:
          index.feedback && index.feedback?.length > 0
            ? index.feedback[0]?.title
            : index.feedback_staff,
        daily_rate: index.daily_rate.toFixed(2),
        decision:
          index.decisions.length > 0
            ? index.decisions[0].decision
            : "No_decision",
        date_refresh: moment(index.date_refresh).format("DD-MM-YYYY"),
      };
    });
    const response = NextResponse.json({
      data: donner,
      status: res.status,
    });
    return response;
  }
}
