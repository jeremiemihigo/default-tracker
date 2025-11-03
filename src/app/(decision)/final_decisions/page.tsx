"use client";
import HeaderComponent from "@/app/header/Header";
import { IRapportDecision } from "@/app/interface/IOther";
import { months } from "@/app/static/lien";
import { Combobox } from "@/app/Tools/combobox";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const datafilter = [
  { label: "Customer ID", value: "codeclient" },
  { label: "Customer name", value: "customer_name" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  { label: "Decision", value: "decision" },
  { label: "Par", value: "par" },
  { label: "Statut", value: "statut" },
  { label: "Submitedby", value: "createdBy" },
  { label: "Departement", value: "departement" },
  { label: "Verifiedby", value: "verifiedby" },
];

function LastDecision() {
  const [alldecisions, setAllDecisions] = React.useState<IRapportDecision[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [month, setMonth] = React.useState<string>("current");
  const downloadDecisions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decision/decision/${month}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();

      if (response.status === 200) {
        setAllDecisions(response.data);
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
  React.useEffect(() => {
    const initialize = async () => {
      await downloadDecisions();
    };
    initialize();
  }, []);
  const keyColonnes = [
    { title: "Customer ID", accessorKey: "codeclient" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Decision", accessorKey: "decision" },
    { title: "Par", accessorKey: "par" },
    { title: "Statut", accessorKey: "statut" },
    { title: "Submitedby", accessorKey: "createdBy" },
    { title: "Departement", accessorKey: "departement" },
    { title: "Verifiedby", accessorKey: "verifiedby" },
  ];

  const columns1: ColumnDef<IRapportDecision>[] = keyColonnes.map((cle) => {
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
      cell: ({ row }) => (
        <div
          className={
            cle.accessorKey === "statut"
              ? row.original.statut.toLocaleLowerCase()
              : ""
          }
        >
          {row.getValue(cle.accessorKey)}
        </div>
      ),
    };
  });
  return (
    <HeaderComponent title="Final decisions">
      <>
        {!isLoading && (
          <Tableau_set_Header
            data={alldecisions}
            columns={columns1}
            customer_id="codeclient"
            datafilter={datafilter}
            childrentop={
              <div className="flex gap-3">
                <Excel
                  data={alldecisions}
                  filename="decisions"
                  title="Export to excel"
                />
                <Combobox data={months} value={month} setValue={setMonth} />
                <Button onClick={() => downloadDecisions()} className="w-full">
                  Search
                </Button>
              </div>
            }
          />
        )}
      </>

      {isLoading && <Loading type="Loading" />}
    </HeaderComponent>
  );
}

export default LastDecision;
