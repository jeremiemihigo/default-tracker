import { IPayement } from "@/app/interface/IOther";
import Loading from "@/app/Tools/loading";
import Tableau from "@/app/Tools/Tableau";
import React from "react";
type Props = {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};
function TableauPayement({ load, setLoad }: Props) {
  const [data, setData] = React.useState<IPayement[]>([]);
  const loadingData = async () => {
    setLoad(true);
    try {
      const result = await fetch("/api/payement", {
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
  const keycolonnes = [
    { accessorKey: "account_id", title: "account_id" },
    { accessorKey: "amount", title: "amount" },
    { accessorKey: "transaction_time", title: "transaction_time" },
    { accessorKey: "payment_status", title: "payment_status" },
    {
      accessorKey: "provider_transact_reference",
      title: "provider_transact_reference",
    },
  ];
  return (
    <div>
      {load && <Loading type="Loading" />}
      {data.length > 0 && !load && (
        <Tableau
          data={data}
          keyColonnes={keycolonnes}
          search_placeholder="account_id"
          customer_id="account_id"
        />
      )}
    </div>
  );
}

export default TableauPayement;
