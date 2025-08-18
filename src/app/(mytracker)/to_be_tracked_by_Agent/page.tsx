"use client";
import HeaderComponent from "@/app/header/Header";
import { IVisitedAgent } from "@/app/interface/TClient";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const datafilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Customer name", value: "customer_name" },
  { label: "Shop name", value: "shop" },
  { label: "Par", value: "par" },
  { label: "Date Save", value: "Date_Save" },
  { label: "Feedback", value: "feedback" },
  { label: "Id_who_had_visited", value: "Id_who_had_visited" },
  { label: "Agent_who_had_visited", value: "agent_who_had_visited" },
  { label: "Feedback_call", value: "Feedback_call" },
];

function To_be_tracked_by_Agent() {
  const [data, setData] = React.useState<IVisitedAgent[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);
  const loading = async () => {
    try {
      const res = await fetch("/api/visitedagent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status === 200) {
        setData(response.data);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      loading();
    };
    initialize();
  }, []);

  const keyColonnes = [
    { title: "Customer ID", accessorKey: "customer_id" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Par", accessorKey: "par" },
    { title: "Date Save", accessorKey: "Date_Save" },
    { title: "Feedback", accessorKey: "feedback" },
    { title: "Id_who_had_visited", accessorKey: "Id_who_had_visited" },
    { title: "Agent_who_had_visited", accessorKey: "agent_who_had_visited" },
    { title: "Feedback_call", accessorKey: "Feedback_call" },

    // { title: "indt", accessorKey: "indt", },
  ];
  const columns: ColumnDef<IVisitedAgent>[] = keyColonnes.map((cle) => {
    return {
      accessorKey: cle.accessorKey,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {cle.title}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue(cle.accessorKey)}</div>,
    };
  });
  return (
    <HeaderComponent title="Customers to be track by agent">
      {load && <Loading type="Loading" />}
      {data.length > 0 && (
        <>
          <Excel data={data} filename="Visites to be tracked by agent" />
          <Tableau_set_Header
            data={data}
            columns={columns}
            customer_id="customer_id"
            datafilter={datafilter}
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default To_be_tracked_by_Agent;
