"use client";
import HeaderComponent from "@/app/header/Header";
import { ITclient } from "@/app/interface/TClient";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Individually from "./individually/Individually";

function Customers() {
  const [data, setData] = useState<ITclient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const submitLogin = async () => {
    try {
      const res = await fetch("/api/allclient/allclient", {
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
    { title: "Par", accessorKey: "par" },
    { title: "In process", accessorKey: "In_process" },
    { title: "Feedback_call", accessorKey: "Feedback_call" },
    { title: "Feedback PA or Tech", accessorKey: "Feedback_PA_or_Tech" },
    { title: "ZBM,RS,SM & TL", accessorKey: "zbm_rs_sm_tl" },
    { title: "Feedback_PO", accessorKey: "Feedback_PO" },
    { title: "Current status", accessorKey: "Current_status" },
    { title: "Action", accessorKey: "Action" },
    { title: "Decision", accessorKey: "Decision" },
    { title: "Expected cash", accessorKey: "expected_cash" },
    { title: "Cash Pay", accessorKey: "cash_Pay" },
    { title: "In charge", accessorKey: "In_charge" },
  ];

  const columns1: ColumnDef<ITclient>[] = keyColonnes.map((cle) => {
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
            cle.accessorKey === "In_process"
              ? "" + row.original["In_process" as keyof ITclient]
              : ""
          }
        >
          {row.getValue(cle.accessorKey)}
        </div>
      ),
    };
  });
  return (
    <HeaderComponent title="All Customers to track for this month">
      {isLoading ? (
        <Loading type="Loading" />
      ) : (
        <>
          <div className="flex gap-2">
            <Excel data={data} filename="All customer to track" />
            <Popup
              btnname="Individual search"
              title="Individual search"
              description=""
              component={
                <Individually
                  setData={setData as Dispatch<SetStateAction<ITclient[]>>}
                />
              }
            />
          </div>
          <Tableau_set_Header
            data={data}
            columns={columns1}
            customer_id="customer_id"
            search_placeholder="Filter by customer ID"
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Customers;
