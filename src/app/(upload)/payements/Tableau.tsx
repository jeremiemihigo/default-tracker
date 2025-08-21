import { IPayement } from "@/app/interface/IOther";
import Tableau from "@/app/Tools/Tableau";
import React from "react";
type Props = {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<IPayement[]>>;
  data: IPayement[];
};
function TableauPayement({ load, data }: Props) {
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
