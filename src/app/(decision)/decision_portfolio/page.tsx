"use client";
import HeaderComponent from "@/app/header/Header";
import { IRapportDecision } from "@/app/interface/IOther";
import { IDecision } from "@/app/interface/TClient";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MessageCircle, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Validation from "../decision_field/validation";
import Commentaire from "../decision_fraude/Commentaire";

const datafilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  { label: "Decision", value: "decision" },
  { label: "Par", value: "par" },
  { label: "Statut", value: "statut" },
  { label: "Submitedby", value: "createdBy" },
];

function Decision_portfolio() {
  const [data, setData] = useState<IDecision[]>([]);
  const [alldecisions, setAllDecisions] = useState<IRapportDecision[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decision/portfolio`, {
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
    { title: "Decision", accessorKey: "decision" },
    { title: "Par", accessorKey: "par" },
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
          component={<Validation type="call_center" client={row.original} />}
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
  const downloadDecisions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);
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

  return (
    <HeaderComponent title="Decision portfolio">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <Tableau_set_Header
            data={data}
            columns={[...columns, ...columns1, ...columncomment]}
            customer_id="customer_id"
            datafilter={datafilter}
            childrentop={
              <>
                <Button onClick={() => downloadDecisions()}>
                  Download Decisions
                </Button>
                {alldecisions.length > 0 && (
                  <Excel
                    data={alldecisions}
                    filename="decisions"
                    title="Export to excel"
                  />
                )}
              </>
            }
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Decision_portfolio;
