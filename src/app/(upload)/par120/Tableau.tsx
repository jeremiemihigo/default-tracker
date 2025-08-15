import { IDataRefresh } from "@/app/interface/IOther";
import Excel from "@/app/Tools/Excel";
import Loading from "@/app/Tools/loading";
import { Button } from "@/components/ui/button";
import React from "react";

function TableauPayement() {
  const [data, setData] = React.useState<IDataRefresh[]>([]);
  const [load, setLoad] = React.useState<boolean>(true);
  const loadingData = async () => {
    setLoad(true);
    try {
      const result = await fetch("/api/par120/datarefresh", {
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
      const res = await fetch("/api/par120/datarefresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response) {
        window.location.replace("/par120");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {load && <Loading type="Loading" />}
      <div className="gap-3 flex mt-3">
        <Excel data={data} title="Export" filename="Data" />
        <Button onClick={() => refreshData()}>Refresh Data</Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Customer ID",
                "Customer Name",
                "Shop",
                "Region",
                "Tracker",
                "Last Update",
                "Payment Status",
                "Customer Status",
                "Observation",
                "Daily Rate",
                "Date Refresh",
                "Déjà Payé",
                "Feedback Staff",
                "Performance",
                "Staff Ayant Visité",
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
              data.map((row) => (
                <tr
                  key={row.customer_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-1 py-0.5 border-b">{row.customer_id}</td>
                  <td className="px-1 py-0.5 border-b">{row.customer_name}</td>
                  <td className="px-1 py-0.5 border-b">{row.shop}</td>
                  <td className="px-1 py-0.5 border-b">{row.region}</td>
                  <td className="px-1 py-0.5 border-b">{row.tracker_par}</td>
                  <td className="px-1 py-0.5 border-b">
                    {new Date(
                      row.current__status.date_update
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-1 py-0.5 border-b">
                    {row.current__status.current_payment_status}
                  </td>
                  <td className="px-1 py-0.5 border-b">
                    {row.current__status.current_customer_status}
                  </td>
                  <td className="px-1 py-0.5 border-b">{row.observation}</td>
                  <td className="px-1 py-0.5 border-b">{row.daily_rate}$</td>
                  <td className="px-1 py-0.5 border-b">
                    {new Date(row.date_refresh).toLocaleDateString()}
                  </td>
                  <td className="px-1 py-0.5 border-b">{row.dejaPayer}$</td>
                  <td className="px-1 py-0.5 border-b">{row.feedback_staff}</td>
                  <td className="px-1 py-0.5 border-b">{row.performance}</td>
                  <td className="px-1 py-0.5 border-b">
                    {row.staff_ayant_visite}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableauPayement;
