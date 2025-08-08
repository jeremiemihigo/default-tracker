"use client";
import HeaderComponent from "@/app/header/Header";
import { IHistoricalStatus } from "@/app/interface/TClient";
import Loading from "@/app/Tools/loading";
import Tableau from "@/app/Tools/Tableau";
import { Input } from "@/components/ui/input";
import React from "react";

function HistoricalStatus() {
  const [load, setLoad] = React.useState<boolean>(false);
  const [data, setData] = React.useState<IHistoricalStatus[]>();
  const loading = async (codeclient: string) => {
    try {
      setLoad(true);
      const result = await fetch(`/api/historique`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(codeclient),
      });
      const response = await result.json();
      if (response.status === 200) {
        setData(response.data);
        setLoad(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred", error);
      }
    }
  };

  const keyColonnes = [
    { title: "Month", accessorKey: "month" },
    { title: "createdAt", accessorKey: "createdAt" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Par", accessorKey: "par" },
    { title: "currentFeedback", accessorKey: "currentFeedback" },
    { title: "Action", accessorKey: "action" },
    { title: "Decision", accessorKey: "statut_decision" },
    { title: "Last feedback", accessorKey: "lastfeedback" },
    { title: "Next feedback", accessorKey: "nextfeedback" },
    { title: "role", accessorKey: "role" },
    { title: "poste", accessorKey: "poste" },
    { title: "sla", accessorKey: "sla" },
  ];

  return (
    <HeaderComponent title="Historical status">
      <div className="max-w-sm p-3">
        <Input
          id="customer_id"
          name="customer_id"
          placeholder="Search by customer ID"
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              loading((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>
      {!load && data && data.length > 0 && (
        <Tableau
          data={data}
          keyColonnes={keyColonnes}
          customer_id="month"
          search_placeholder="Filter by Month"
        />
      )}
      {load && <Loading type="Loading" />}
    </HeaderComponent>
  );
}

export default HistoricalStatus;
