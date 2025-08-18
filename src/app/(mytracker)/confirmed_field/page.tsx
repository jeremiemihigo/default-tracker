"use client";
import HeaderComponent from "@/app/header/Header";
import { ICasValider } from "@/app/interface/TClient";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import ChangeDecision from "../confirmed_fraude/decision";

const datafilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Customer name", value: "customer_name" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  { label: "Par", value: "par" },
  { label: "Last feedback", value: "lastfeedback" },
  { label: "Next feedback", value: "nextfeedback" },
  { label: "sla", value: "SLA" },

  { label: "Submitedby", value: "submitedBy" },
];

function Confirmed_field() {
  const [data, setData] = useState<ICasValider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = async () => {
    try {
      const res = await fetch("/api/cas_valider/field", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === 200) {
        setData(data.data);
        setIsLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred", error);
      }
    }
  };
  useEffect(() => {
    const initialize = async () => {
      submitLogin();
    };
    initialize();
  }, []);
  const keyColonnes = [
    { title: "Customer ID", accessorKey: "customer_id" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Par", accessorKey: "par" },
    { title: "Last feedback", accessorKey: "lastfeedback" },
    { title: "Next feedback", accessorKey: "nextfeedback" },
    { title: "sla", accessorKey: "SLA" },
    { title: "createdAt", accessorKey: "createdAt" },

    { title: "Submitedby", accessorKey: "submitedBy" },
  ];
  const columns: ColumnDef<ICasValider>[] = [
    {
      id: "Option",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Popup
          btnname={<SquarePen />}
          title="Change decision for customer"
          component={<ChangeDecision data={row.original} />}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  const columns1: ColumnDef<ICasValider>[] = keyColonnes.map((cle) => {
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
    <HeaderComponent title="Confirmed by field managment">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <Tableau_set_Header
          data={data}
          columns={[...columns, ...columns1]}
          customer_id="customer_id"
          datafilter={datafilter}
        />
      )}
    </HeaderComponent>
  );
}

export default Confirmed_field;
