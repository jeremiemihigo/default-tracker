"use client";
import ChangeDecision from "@/app/(mytracker)/confirmed_fraude/decision";
import HeaderComponent from "@/app/header/Header";
import { IDataRefresh } from "@/app/interface/IOther";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import Popup from "@/app/Tools/Popup";
import { Button } from "@/components/ui/button";
import React from "react";

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
            <table className="min-w-full border border-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "#",
                    "Customer ID",
                    "Customer Name",
                    "Shop",
                    "Par",
                    "Payment Status",
                    "Customer Status",
                    "Observation",
                    "Daily Rate",
                    "Date Refresh",
                    "Already Paid",
                    "Feedback",
                    "Performance",
                    "Staff Having Visited",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-300"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={15}
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      Aucun enregistrement trouvé.
                    </td>
                  </tr>
                ) : (
                  data.map((row, key) => (
                    <tr
                      key={row.customer_id}
                      className="hover:bg-gray-50 transition-colors text-sm"
                    >
                      <td className="px-1 py-0.5 border-b">{key + 1}</td>
                      <td className="px-1 py-0.5 border-b">
                        {row.customer_id}
                      </td>
                      <td className="px-1 py-0.5 border-b text-sm">
                        {row.customer_name}
                      </td>
                      <td className="px-1 py-0.5 border-b">{row.shop}</td>
                      <td className="px-1 py-0.5 border-b">{row.par}</td>

                      <td className="px-1 py-0.5 border-b grid">
                        <p> {row.current__status.current_payment_status}</p>

                        <p className="date_update">
                          {new Date(
                            row.current__status.date_update
                          ).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        <p>{row.current__status.current_customer_status}</p>
                        <p className="date_update">
                          {new Date(
                            row.current__status.date_update
                          ).toLocaleDateString()}
                        </p>
                      </td>
                      <td
                        className={`px-1 py-0.5 border-b ${row.observation.toLowerCase()}`}
                      >
                        {row.observation}
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {row.daily_rate.toFixed(1)}$
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {new Date(row.date_refresh).toLocaleDateString()}
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {row.dejaPayer.toFixed(1)}$
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {row.feedback && row.feedback?.length > 0
                          ? row.feedback[0]?.title
                          : row.feedback_staff}
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {["Lui-meme", "Pas lui-meme"].includes(
                          row.performance
                        ) ? (
                          <>
                            <Popup
                              title="Decisions"
                              component={
                                <ChangeDecision
                                  data={{
                                    customer_id: row.customer_id,
                                    shop: row.shop,
                                    region: row.region,
                                    idHistorique: row._id,
                                    par: row.par,
                                    customer_name: row.customer_name,
                                  }}
                                />
                              }
                              btnname={row.performance}
                            />
                          </>
                        ) : (
                          row.performance
                        )}
                      </td>
                      <td className="px-1 py-0.5 border-b">
                        {row.staff_ayant_visite}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </HeaderComponent>
  );
}

export default TableauPayement;
