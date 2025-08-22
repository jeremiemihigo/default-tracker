"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import HeaderComponent from "../header/Header";
import { IRapportPar120 } from "../interface/IOther";
import { Combobox } from "../Tools/combobox";
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

  const [colonnesShow, setColonnesShow] = React.useState<string[]>([
    "1",
    "2",
    "3",
  ]);
  const allcolonnes = [
    { id: "1", title: "Staff household visit" },
    { id: "2", title: "Actions in objective" },
    { id: "3", title: "Daily monitoring of actions and visits" },
  ];
  const onselectColonens = (id: string) => {
    if (colonnesShow.includes(id)) {
      setColonnesShow(colonnesShow.filter((x) => x !== id));
    } else {
      setColonnesShow([...colonnesShow, id]);
    }
  };
  const typeRecherche = [
    { label: "Region", value: "region" },
    { label: "Shop", value: "shop" },
    { label: "Staff", value: "name" },
    { label: "Fonction", value: "fonction" },
  ];
  const [typeselect, setTypeSelect] = React.useState<string>("");
  const [valuefilter, setValueFilter] = React.useState<string>("");
  const [filterFn, setFilterFn] = React.useState({
    fn: (items: IRapportPar120[]) => {
      return items;
    },
  });
  React.useEffect(() => {
    setFilterFn({
      fn: (items: IRapportPar120[]) => {
        if (typeselect === "") {
          return items;
        } else {
          if (typeselect === "region" && valuefilter !== "") {
            return items.filter((x) =>
              x.region?.denomination
                .toUpperCase()
                .includes(valuefilter.toUpperCase())
            );
          }
          if (typeselect === "shop" && valuefilter !== "") {
            return items.filter((x) =>
              x.shop[0]?.shop.toUpperCase().includes(valuefilter.toUpperCase())
            );
          }
          if (typeselect === "name" && valuefilter !== "") {
            return items.filter((x) =>
              x.name.toUpperCase().includes(valuefilter.toUpperCase())
            );
          }
          if (typeselect === "fonction" && valuefilter !== "") {
            return items.filter((x) =>
              x.fonction.toUpperCase().includes(valuefilter.toUpperCase())
            );
          }
          return items;
        }
      },
    });
  }, [typeselect, valuefilter]);
  return (
    <HeaderComponent title="Rapport PAR 120+">
      {load && <Loading type="Loading" />}
      {!load && data.length > 0 && (
        <>
          <div>
            <div className="lg:flex gap-3 mb-4">
              <div className="w-sm">
                <Combobox
                  data={typeRecherche}
                  value={typeselect}
                  setValue={setTypeSelect}
                />
              </div>
              <div className="w-sm">
                <Input
                  placeholder={`Filter by ${typeselect}`}
                  onChange={(e) => setValueFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mb-4 gap-10">
              {allcolonnes.map((index) => {
                return (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    key={index.id}
                  >
                    <Checkbox
                      id={index.id}
                      onClick={() => onselectColonens(index.id)}
                      checked={colonnesShow.includes(index.id)}
                    />
                    <Label htmlFor={index.id}>{index.title}</Label>
                  </div>
                );
              })}
            </div>
          </div>
          <table className="w-full border  border-gray-300 text-xs">
            <thead>
              <tr className="text-white">
                <th
                  colSpan={5}
                  className="bg-blue-900 border border-gray-300 py-2"
                >
                  STAFF INFORMATION
                </th>
                {colonnesShow.includes("1") && (
                  <th
                    colSpan={9}
                    className="bg-yellow-400 border border-gray-300 py-2 text-black"
                  >
                    Staff household visit
                  </th>
                )}
                {colonnesShow.includes("2") && (
                  <th
                    colSpan={5}
                    className="bg-red-500 border border-gray-300 py-2"
                  >
                    Actions in objective
                  </th>
                )}
                {colonnesShow.includes("3") && (
                  <th
                    colSpan={4}
                    className="bg-green-500 border border-gray-300 py-2"
                  >
                    Daily monitoring of actions and visits
                  </th>
                )}
              </tr>
              <tr className="bg-gray-200 text-black">
                <th className="border border-gray-300 px-2 py-1">Region</th>
                <th className="border border-gray-300 px-2 py-1">Shop</th>
                <th className="border border-gray-300 px-2 py-1">
                  My staff in charge
                </th>
                <th className="border border-gray-300 px-2 py-1">Fonction</th>
                <th className="border border-gray-300 px-2 py-1">
                  Staff dispo?
                </th>
                {colonnesShow.includes("1") && (
                  <>
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
                  </>
                )}
                {colonnesShow.includes("2") && (
                  <>
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
                      % Realisation PAR 120
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Remaining daily target
                    </th>
                  </>
                )}
                {colonnesShow.includes("3") && (
                  <>
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
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filterFn.fn(data).map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {item.fonction === "PO" ? (
                    <>
                      <td
                        className="border border-gray-300 px-2 py-1 text-center"
                        colSpan={2}
                      >
                        {item.region.denomination}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.region.denomination}
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.shop?.[0]?.shop || ""}
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 px-2 py-1">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.fonction}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.disponible}
                  </td>
                  {colonnesShow.includes("1") && (
                    <>
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
                      <td
                        className={`border border-gray-300 px-2 py-1 ${
                          item["%visit_vs_target"] > 50
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item["%visit_vs_target"]}%
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.Current_visit_target}
                      </td>
                    </>
                  )}
                  {colonnesShow.includes("2") && (
                    <>
                      <td className="border border-gray-300 px-2 py-1">
                        {item["No_action_PAR_120+"]}
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item["Realisation_PAR_120+"]}
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item["Obj_PAR120+"]}
                      </td>
                      <td
                        className={`border border-gray-300 px-2 py-1 ${
                          item["%_Realisation_default"] > 50
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item["%_Realisation_default"]}%
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        {item.Remaining_daily_action_target}
                      </td>
                    </>
                  )}
                  {colonnesShow.includes("3") && (
                    <>
                      <td className="px-2 py-1 border border-gray-300">
                        {item.action_hier}
                      </td>
                      <td className="px-2 py-1 border border-gray-300">
                        {item.action_hier_visited}
                      </td>
                      <td className="px-2 py-1 border border-gray-300">
                        {item.all_visite_hier}
                      </td>
                      <td className="px-2 py-1 border border-gray-300">
                        {item.hier_par120}
                      </td>
                    </>
                  )}
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
