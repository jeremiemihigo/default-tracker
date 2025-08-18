"use client";
import HeaderComponent from "@/app/header/Header";
import { IAction } from "@/app/interface/IAction";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen } from "lucide-react";
import React from "react";
import ValidationAction from "./ValidationAction";

const datafilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "customer_name", value: "customer_name" },
  { label: "current", value: "current" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  { label: "Par", value: "par" },
  { label: "Submitedby", value: "submitedBy" },
];

function Actions() {
  const [actions, setActions] = React.useState<IAction[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);

  const loadAction = async () => {
    try {
      setLoad(true);
      const response = await fetch("/api/action", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status === 200) {
        setActions(result.data);
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
  React.useEffect(() => {
    const initialize = async () => {
      await loadAction();
    };
    initialize();
  }, []);

  const keyColonnes = [
    { title: "Customer ID", accessorKey: "customer_id" },
    { title: "customer_name", accessorKey: "customer_name" },
    { title: "current", accessorKey: "current" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Par", accessorKey: "par" },
    { title: "Submitedby", accessorKey: "submitedBy" },
  ];
  const columns1: ColumnDef<IAction>[] = keyColonnes.map((cle) => {
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
  const columns: ColumnDef<IAction>[] = [
    {
      id: "Option",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Edit
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Popup
            btnname={<SquarePen />}
            title="Change status for"
            component={
              <ValidationAction
                id={row.original.customer_id}
                typeAction={row.original.typeAction}
              />
            }
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <HeaderComponent title="Actions">
      {load ? (
        <Loading type="Loading" />
      ) : (
        <>
          <Excel data={actions} filename="Actions" />
          <Tableau_set_Header
            data={actions}
            columns={[...columns, ...columns1]}
            customer_id="customer_id"
            datafilter={datafilter}
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Actions;
