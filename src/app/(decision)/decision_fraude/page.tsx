"use client";
import HeaderComponent from "@/app/header/Header";
import { IDecision } from "@/app/interface/TClient";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MessageCircle, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Validation from "../decision_field/validation";
import Commentaire from "./Commentaire";

const datafilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  { label: "Decision", value: "decision" },
  { label: "Statut", value: "statut" },
  { label: "Submitedby", value: "createdBy" },
];

function Decision_fraude() {
  const [data, setData] = useState<IDecision[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decision/D7UNY`, {
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
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Decision", accessorKey: "decision" },
    { title: "Statut", accessorKey: "statut" },
    { title: "Submitedby", accessorKey: "createdBy" },
  ];
  const columns1: ColumnDef<IDecision>[] = keyColonnes.map((cle) => {
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
  const columns: ColumnDef<IDecision>[] = [
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
          component={<Validation type="field_fraude" client={row.original} />}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  const columncomment: ColumnDef<IDecision>[] = [
    {
      id: "Comment",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Comment
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Popup
          btnname={
            <>
              <MessageCircle /> <span className="ml-3">show comments</span>
            </>
          }
          title="Comments"
          component={<Commentaire comment={row.original.commentaire} />}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <HeaderComponent title="Decision fraude managment">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <Tableau_set_Header
            data={data}
            columns={[...columns, ...columns1, ...columncomment]}
            customer_id="customer_id"
            datafilter={datafilter}
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Decision_fraude;
