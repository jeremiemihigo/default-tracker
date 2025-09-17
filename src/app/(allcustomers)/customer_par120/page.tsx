"use client";
import ChangeDecision from "@/app/(mytracker)/confirmed_fraude/decision";
import HeaderComponent from "@/app/header/Header";
import { IDataRefresh } from "@/app/interface/IOther";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import Tableau_set_Header from "@/app/Tools/Tab_set_Header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

const colonneFilter = [
  { label: "Customer ID", value: "customer_id" },
  { label: "Customer name", value: "customer_name" },
  { label: "Shop name", value: "shop" },
  { label: "Region name", value: "region" },
  {
    label: "track_by",
    value: "tracker_par",
  },
  {
    label: "Observation",
    value: "observation",
  },
];

function TableauPayement() {
  const [data, setData] = React.useState<IDataRefresh[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);
  const loadingData = async () => {
    setLoad(true);
    try {
      const result = await fetch("/api/par120/mesclient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      setData(response.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      loadingData();
    };
    initialize();
  }, []);

  const refreshData = async () => {
    try {
      setLoad(true);
      const res = await fetch("/api/par120/datarefresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response) {
        loadingData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const keyColonnes = [
    { title: "Customer ID", accessorKey: "customer_id" },
    { title: "Customer name", accessorKey: "customer_name" },
    { title: "Shop name", accessorKey: "shop" },
    { title: "Region name", accessorKey: "region" },
    {
      title: "Track by",
      accessorKey: "tracker_par",
    },
    {
      title: "Update date",
      accessorKey: "date_refresh",
    },
  ];
  const columns1: ColumnDef<IDataRefresh>[] = keyColonnes.map((cle) => {
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
  const columns: ColumnDef<IDataRefresh>[] = [
    {
      id: "Observation",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Observation
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className={row.original.observation.toLocaleLowerCase()}>
          {row.original.observation}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "daily_rate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Daily_rate
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>${row.original.daily_rate}</>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "dejaPayer",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Already Paid
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>${row.original.dejaPayer}</>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "performance",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Performance
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          {row.original.performance !== "Not visited" ? (
            <Popup
              title="Decisions"
              component={
                <ChangeDecision
                  data={{
                    customer_id: row.original.customer_id,
                    shop: row.original.shop,
                    region: row.original.region,
                    idHistorique: row.original._id,
                    par: row.original.par,
                    customer_name: row.original.customer_name,
                  }}
                />
              }
              btnname={row.original.performance}
            />
          ) : (
            row.original.performance
          )}
        </>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  const columns2: ColumnDef<IDataRefresh>[] = [
    {
      accessorKey: "feedback",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Feedback
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <>{row.original.feedback}</>,
    },
  ];

  return (
    <HeaderComponent title="My Tracker PAR 120+">
      {load && <Loading type="Loading" />}
      {!load && (
        <>
          <div className="gap-3 flex m-3">
            <Excel data={data} title="Export" filename="Data" />
            <Button onClick={() => refreshData()}>Refresh Data</Button>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <Tableau_set_Header
              data={data}
              columns={[...columns1, ...columns, ...columns2]}
              customer_id="customer_id"
              datafilter={colonneFilter}
              childrentop={
                <>
                  <div>
                    <p className="text-sm text-gray-500 text-center">
                      No action no visits
                    </p>
                    <p className="text-3xl font-bold text-red-600 text-center">
                      {(
                        (data.filter((x) => x.performance === "Not visited")
                          .length /
                          data.filter((x) => x.observation === "No_action")
                            .length) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm text-gray-500 text-center">
                      Percentage of actions
                    </p>
                    <p className="text-3xl font-bold text-red-600 text-center">
                      {(
                        (data.filter((x) => x.observation !== "No_action")
                          .length /
                          data.length) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                  <div className="pl-3 cursor-pointer">
                    <p className="text-sm text-gray-500 text-center">
                      Paid, but insufficient to reactivate
                    </p>
                    <p className="text-3xl font-bold text-blue-600 text-center">
                      {
                        data.filter(
                          (x) =>
                            x.observation === "No_action" && x.dejaPayer > 0
                        ).length
                      }{" "}
                    </p>
                  </div>
                </>
              }
            />
          </div>
        </>
      )}
    </HeaderComponent>
  );
}

export default TableauPayement;
