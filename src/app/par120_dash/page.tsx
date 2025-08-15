"use client";
import React from "react";
import HeaderComponent from "../header/Header";
import { IRapportPar120 } from "../interface/IOther";
import Loading from "../Tools/loading";

function PagePar120Dash() {
  const [data, setData] = React.useState<IRapportPar120[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);
  const loadingData = async () => {
    try {
      const res = await fetch("/api/par120", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status === 200) {
        setData(response.data);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const initialze = async () => {
      loadingData();
    };
    initialze();
  }, []);
  return (
    <HeaderComponent title="Rapport PAR 120+">
      {load && <Loading type="Loading" />}
      {!load && data.length > 0 && (
        <>
          <table className="w-full border border-gray-300 text-xs">
            <thead>
              <tr className="text-white">
                <th
                  colSpan={5}
                  className="bg-blue-900 border border-gray-300 py-2"
                >
                  RENSEIGNEMENTS STAFF
                </th>
                <th
                  colSpan={9}
                  className="bg-yellow-400 border border-gray-300 py-2 text-black"
                >
                  Visite ménages staff
                </th>
                <th
                  colSpan={5}
                  className="bg-green-500 border border-gray-300 py-2"
                >
                  Action en objectif
                </th>
                <th
                  colSpan={4}
                  className="bg-red-500 border border-gray-300 py-2"
                >
                  Suivi journalier des actions et visites
                </th>
              </tr>
              <tr className="bg-gray-200 text-black">
                <th className="border border-gray-300 px-2 py-1">Region</th>
                <th className="border border-gray-300 px-2 py-1">Shop</th>
                <th className="border border-gray-300 px-2 py-1">
                  Mon staff en charge
                </th>
                <th className="border border-gray-300 px-2 py-1">Fonction</th>
                <th className="border border-gray-300 px-2 py-1">
                  Staff dispo?
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  All visit M-1
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  All visit M
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Gap visit %
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Obj visited
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Obj visited other
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Not visited
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Total to track
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  % visit vs target
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Current target
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  No action PAR 120+
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Realisation PAR 120
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Obj PAR 120+
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  % Realisation default
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Remaining daily target
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Action hier
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Action hier visit
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Visit hier all
                </th>
                <th className="border border-gray-300 px-2 py-1">
                  Visit hier PAR 120+
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.region.denomination}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.shop?.[0]?.shop || ""}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.fonction}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.disponible}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.vm_moispasse}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.vm_moisactuel}
                  </td>
                  <td
                    className={`border border-gray-300 px-2 py-1 ${
                      item.gap_vm > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.gap_vm}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.Obj_visited}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.Obj_visited_by_others}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.not_visited_object}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.Total_to_track}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item["%visit_vs_target"]}%
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.Current_visit_target}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item["No_action_PAR_120+"]}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item["Realisation_PAR_120+"]}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item["Obj_PAR120+"]}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item["%_Realisation_default"]}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.Remaining_daily_action_target}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">0</td>
                  <td className="border border-gray-300 px-2 py-1">0</td>
                  <td className="border border-gray-300 px-2 py-1">0</td>
                  <td className="border border-gray-300 px-2 py-1">0</td>
                </tr>
              ))}
            </tbody>
          </table>
          ;
        </>
      )}
    </HeaderComponent>
  );
}

export default PagePar120Dash;
