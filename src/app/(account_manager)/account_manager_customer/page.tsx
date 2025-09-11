"use client";
import HeaderComponent from "@/app/header/Header";
import { IAccountManager } from "@/app/interface/AccountManager";
import Loading from "@/app/Tools/loading";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const colonneFilter = [
  { label: "Unique_account_id", value: "unique_account_id" },
  { label: "Customer name", value: "customer_name" },
  { label: "sat", value: "sat" },
  { label: "ID_Account_manager", value: "id_Account_manager" },
];

function Page() {
  const [data, setData] = React.useState<IAccountManager[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);
  const loading = async () => {
    try {
      const res = await fetch("/api/account_manager/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loading();
      setLoad(false);
    };
    initialize();
  }, []);
  const keyColonnes = [
    { title: "Unique_account_id", accessorKey: "unique_account_id" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "sat", accessorKey: "sat" },
    { title: "ID_Account_manager", accessorKey: "id_Account_manager" },
  ];

  const columns1: ColumnDef<IAccountManager>[] = keyColonnes.map((cle) => {
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
      cell: ({ row }) => <>{row.getValue(cle.accessorKey)}</>,
    };
  });
  const columns: ColumnDef<IAccountManager>[] = [
    {
      accessorKey: "Agent",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Agent
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>{row.original.agent[0].nom}</>,
    },
    {
      accessorKey: "visites",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Visites
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>{row.original.visites.length}</>,
    },
  ];
  return (
    <HeaderComponent title="Customers for Account Manager">
      {load ? (
        <Loading type="Loading" />
      ) : (
        <Tableau_set_Header
          data={data}
          columns={[...columns1, ...columns]}
          customer_id="unique_account_id"
          datafilter={colonneFilter}
        />
      )}
    </HeaderComponent>
  );
}

export default Page;
