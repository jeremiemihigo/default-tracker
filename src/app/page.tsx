"use client";

import HeaderComponent from "@/app/header/Header";
import { IDonner } from "@/app/interface/IOther";
import Loading from "@/app/Tools/loading";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import React from "react";

function MainPage() {
  const [data, setData] = React.useState<IDonner>();
  const [load, setLoad] = React.useState<boolean>(true);

  const loading = async () => {
    setLoad(true);
    try {
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setData(result.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const initialize = async () => {
      await loading();
    };
    initialize();
  }, []);

  const field = [
    {
      title: "Validation",
      value: data ? data?.validationField : 0,
      description:
        "Toutes les actions déjà validées par le département Field du début du mois à date",
    },
    {
      title: "Awaiting verification",
      value: data ? data.awaiting_fields : 0,
      description:
        "Toutes les actions qui sont en attente de vérification au département Field",
    },
    {
      title: "Household visits",
      value: data ? data.vmfield : 0,
      description:
        "Toutes les visites déjà effectuées par le département Field",
    },
  ];
  const fraude = [
    {
      title: "Validation",
      value: data ? data?.validationFraude : 0,
      description:
        "Toutes les actions déjà validées par le département de la fraude du début du mois à date",
    },
    {
      title: "Awaiting verification",
      value: data ? data?.awaiting_fraudes : 0,
      description:
        "Toutes les actions qui sont en attente de vérification au département de la fraude",
    },
    {
      title: "Household visits",
      value: data ? data.vmpo : 0,
      description:
        "Toutes les visites déjà effectuées par le département de la fraude",
    },
  ];

  return (
    <HeaderComponent title="Dashboard">
      {load && !data ? (
        <Loading type="Loading" />
      ) : (
        <>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards data={field} refresh={data ? data.refresh : 0} />
                <SectionCards data={fraude} />
                <div className="px-4 lg:px-6">
                  {data && (
                    <ChartAreaInteractive chartData={data.dashjournalier} />
                  )}
                </div>
                {data && <DataTable data={data?.regions} />}
              </div>
            </div>
          </div>
        </>
      )}
    </HeaderComponent>
  );
}

export default MainPage;
