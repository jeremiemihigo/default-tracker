"use client";
import HeaderComponent from "@/app/header/Header";
import { IShowDataPar } from "@/app/interface/par120";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquarePen } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Formulaire from "./Formulaire";
import Uploading from "./Upload";

const datafilter = [
  { label: "Name", value: "Name" },
  { label: "Fonction", value: "Fonction" },
  { label: "Size", value: "taille" },
  { label: "Obj_PAR120", value: "Obj_PAR120" },
  { label: "ID", value: "codeAgent" },
  { label: "Available", value: "disponible" },
];

function Fraude_verification() {
  const [data, setData] = useState<IShowDataPar[]>([]);
  const [value, setValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const LoadingData = useCallback(async () => {
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
      await LoadingData();
    };
    initialize();
  }, []);

  const keyColonnes = [
    { title: "Name", accessorKey: "Name" },
    { title: "Fonction", accessorKey: "Fonction" },
    { title: "Size", accessorKey: "taille" },
    { title: "Obj_PAR120", accessorKey: "Obj_PAR120" },
    { title: "ID", accessorKey: "codeAgent" },
    { title: "Available", accessorKey: "disponible" },
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
          <Excel data={data} title="Export" filename="PAR 120" />
          <Uploading load={isLoading} setLoad={setIsLoading} />
          <Tableau_set_Header
            data={data}
            columns={[...columns, ...columns1]}
            customer_id="Name"
            datafilter={datafilter}
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Fraude_verification;
