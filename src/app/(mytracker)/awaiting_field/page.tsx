"use client";
import HeaderComponent from "@/app/header/Header";
import { IVerificationField_Front } from "@/app/interface/TClient";
import { postes } from "@/app/static/lien";
import { Combobox } from "@/app/Tools/combobox";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Changestatus from "./changestatus";

function Awaiting_Field() {
  const [data, setData] = useState<IVerificationField_Front[]>([]);
  const [value, setValue] = useState<string>("PO");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/verification/loading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value, idDepartement: "NRMRG" }),
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
  }, [value, setIsLoading, setData]);

  useEffect(() => {
    const initialize = async () => {
      submitLogin();
    };
    initialize();
  }, [submitLogin]);

  const keyColonnes = [
    { title: "Customer ID", accessorKey: "customer_id" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Par", accessorKey: "par" },
    { title: "Feedback_last_vm", accessorKey: "feedback_last_vm" },
    { title: "Date_last_vm", accessorKey: "date_last_vm" },
    { title: "Agent_last_vm", accessorKey: "agent_last_vm" },
    {
      title: "Last_vm_for_categorie_id",
      accessorKey: "last_vm_for_categorie_id",
    },
    {
      title: "Feedback_call",
      accessorKey: "feedback_call",
    },

    { title: "Current status", accessorKey: "currentFeedback" },
    // { title: "Action", accessorKey: "action" },
    // { title: "Decision", accessorKey: "statut_decision" },
    { title: "incharge", accessorKey: "incharge" },
    { title: "Submitedby", accessorKey: "submitedby" },
  ];
  const columns: ColumnDef<IVerificationField_Front>[] = [
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
        <Popup
          btnname={<SquarePen />}
          title="Change status for"
          description={`Une fois modifié, le client ${row.original.customer_id} ira dans le 
          departement qui prend en charge le feedback selectionné; Il peut rester chez vous 
          si ce feedback est geré à votre niveau`}
          component={<Changestatus data={row.original} />}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  const columns1: ColumnDef<IVerificationField_Front>[] = keyColonnes.map(
    (cle) => {
      return {
        accessorKey: cle.accessorKey,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {cle.title}
              <ArrowUpDown />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.getValue(cle.accessorKey)}</div>,
      };
    }
  );

  return (
    <HeaderComponent title="Awaiting verification by field">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <div className="flex gap-2">
            <div className="w-sm">
              <Combobox value={value} data={postes} setValue={setValue} />
            </div>
            <div>
              <Button variant="default" onClick={() => submitLogin()}>
                Search
              </Button>
            </div>
          </div>
          <Tableau_set_Header
            data={data}
            columns={[...columns, ...columns1]}
            customer_id="customer_id"
            search_placeholder="Filter by customer ID"
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Awaiting_Field;
