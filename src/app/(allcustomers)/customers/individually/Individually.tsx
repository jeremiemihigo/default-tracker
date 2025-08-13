"use client";
import { ICombo } from "@/app/interface/IOther";
import { IUser } from "@/app/interface/IUser";
import { ITclient } from "@/app/interface/TClient";
import { Combobox } from "@/app/Tools/combobox";
import Loading from "@/app/Tools/loading";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setData: Dispatch<SetStateAction<ITclient[]>>;
};
function Individually({ setData }: Props) {
  const [users, setUsers] = React.useState<ICombo[]>([]);
  const [codeAgent, setCodeAgent] = React.useState<string>("");
  const [load, setLoad] = React.useState<boolean>(true);
  const [loadData, setLoadData] = React.useState<boolean>(false);

  const loadingAgent = async () => {
    setLoad(true);
    const result = await fetch("/api/agentadmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (response.status === 200) {
      const utilisateurs: IUser[] = response.data;
      const donner = utilisateurs.map((x) => {
        return {
          label: x.nom,
          value: x.codeAgent,
        };
      });
      setUsers(donner);
      setLoad(false);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loadingAgent();
    };
    initialize();
  }, []);

  const fetchData = async () => {
    try {
      setLoadData(true);
      const result = await fetch(`/api/allclient/individually`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codeAgent }),
      });
      const response = await result.json();
      if (response.status === 200) {
        setData(response.data);
        setLoadData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {load || loadData ? (
        <Loading type="Loading" />
      ) : (
        <div className="p-1 w-full">
          <div className="w-sm">
            <Combobox value={codeAgent} data={users} setValue={setCodeAgent} />
          </div>
          <Button
            className="w-full mt-3"
            onClick={() => fetchData()}
            variant="default"
          >
            <Search /> Search
          </Button>
        </div>
      )}
    </div>
  );
}

export default Individually;
