"use client";
import HeaderComponent from "@/app/header/Header";
import { IAgent } from "@/app/interface/settings/IAgent";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

function Agents() {
  const [donner, setData] = React.useState<IAgent[]>([]);
  const loadingData = async () => {
    const response = await fetch("/api/settings/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 200) {
      setData(data.data);
    }
  };

  React.useEffect(() => {
    loadingData();
  }, []);
  const keyColonnes = [
    { title: "Name", accessorKey: "Name" },
    { title: "ID", accessorKey: "ID" },
    { title: "Shop name", accessorKey: "Shop" },
    { title: "Region name", accessorKey: "Region" },
    { title: "Contact", accessorKey: "Contact" },
    { title: "Fonction", accessorKey: "Fonction" },
    { title: "Status", accessorKey: "Status" },
    { title: "Default_Password", accessorKey: "Default_Password" },
    { title: "Edited_by", accessorKey: "Edited_by" },
  ];

  const columns1: ColumnDef<IAgent>[] = keyColonnes.map((cle) => {
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
            cle.accessorKey === "Status"
              ? "" + row.original["Status" as keyof IAgent]
              : ""
          }
        >
          {row.getValue(cle.accessorKey)}
        </div>
      ),
    };
  });
  const columns_option: ColumnDef<IAgent>[] = [
    {
      accessorKey: "Options",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Options
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="gap-1 flex">
          <Button>Edit</Button>
          <Button variant="destructive">Bloquer</Button>
          <Button>Reset</Button>
        </div>
      ),
    },
  ];
  return (
    <HeaderComponent title="Agents">
      <Tableau_set_Header
        data={donner}
        columns={[...columns1, ...columns_option]}
        customer_id="ID"
        search_placeholder="Filter by ID Agent"
      />
    </HeaderComponent>
  );
}

export default Agents;
