"use client";
import HeaderComponent from "@/app/header/Header";
import { IArbitration } from "@/app/interface/TClient";
import Loading from "@/app/Tools/loading";
import Tableau from "@/app/Tools/Tableau";
import { useEffect, useState } from "react";
import Uploadcallcenter from "./uploadcallcenter";

function Arbitration_call_center() {
  const [data, setData] = useState<IArbitration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = async () => {
    try {
      const res = await fetch("/api/arbitrage/portfolio", {
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
    { title: "Customer name", accessorKey: "custimer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    { title: "Par", accessorKey: "par" },
    { title: "VM agent", accessorKey: "last_vm_agent" },
    { title: "VM po", accessorKey: "last_vm_po" },
    { title: "VM_rs_TL", accessorKey: "last_vm_rs" },
    { title: "Appel", accessorKey: "appel" },
    { title: "current Feedback", accessorKey: "currentFeedbacks" },
    { title: "Submitedby", accessorKey: "submitedBy" },
  ];
  return (
    <HeaderComponent title="Call center categorization">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <Uploadcallcenter clients={data} />

          <Tableau
            data={data}
            keyColonnes={keyColonnes}
            customer_id="customer_id"
            search_placeholder="Filter by customer ID"
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Arbitration_call_center;
