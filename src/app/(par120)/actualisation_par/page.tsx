"use client";
import HeaderComponent from "@/app/header/Header";
import { IShowDataPar } from "@/app/interface/par120";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Formulaire from "./Formulaire";

function Fraude_verification() {
  const [data, setData] = useState<IShowDataPar[]>([]);
  const [value, setValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const SubmitData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/par120/actualisationpar", {
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
  }, [value]); // <-- dépendance

  useEffect(() => {
    const initialize = async () => {
      await SubmitData();
    };
    initialize();
  }, []);

  const keyColonnes = [
    { title: "Name", accessorKey: "Name" },
    { title: "Fonction", accessorKey: "Fonction" },
    { title: "Obj_PAR120", accessorKey: "Obj_PAR120" },
    { title: "codeAgent", accessorKey: "codeAgent" },
    { title: "disponible", accessorKey: "disponible" },
  ];
  const columns1: ColumnDef<IShowDataPar>[] = keyColonnes.map((cle) => {
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
  const columns: ColumnDef<IShowDataPar>[] = [
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
          title="Change"
          component={
            <Formulaire data={row.original} donner={data} setDonner={setData} />
          }
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <HeaderComponent title="Refresh column PAR to track">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <Tableau_set_Header
            data={data}
            columns={[...columns, ...columns1]}
            customer_id="Name"
            search_placeholder="Filter by Name"
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Fraude_verification;
