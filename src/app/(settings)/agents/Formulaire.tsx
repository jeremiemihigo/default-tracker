"use client";

import { IAgent, IAgentAdmin } from "@/app/interface/settings/IAgent";
import { IRegion } from "@/app/interface/settings/Other";
import { fonctionvm } from "@/app/static/functions";
import { Combobox } from "@/app/Tools/combobox";
import Loading from "@/app/Tools/loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Initiale {
  nom: string;
  codeAgent: string;
  telephone: string;
}
type Props = {
  donner: IAgent[];
  edit?: IAgent;
  setDonner: React.Dispatch<React.SetStateAction<IAgent[]>>;
};

function Formulaire({ donner, setDonner, edit }: Props) {
  const [fonction, setFonction] = React.useState<string>("");
  const [load, setLoad] = React.useState<boolean>(true);
  const [account_manager, setAccountManager] = React.useState<boolean>(false);
  const [initiale, setInitiale] = React.useState<Initiale>({
    nom: "",
    codeAgent: "",
    telephone: "",
  });
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitiale({ ...initiale, [e.target.name]: e.target.value });
  };
  const input = [
    { label: "Nom", name: "nom", type: "text" },
    { label: "Code Agent", name: "codeAgent", type: "text" },
    { label: "Telephone", name: "telephone", type: "text" },
  ];
  const inputs = input.map((input) => (
    <div key={input.name} className="mt-3">
      <Label>{input.label}</Label>
      <Input
        name={input.name}
        type={input.type}
        className="mt-3"
        value={initiale[input.name as keyof Initiale]}
        onChange={onchange}
        placeholder={input.label}
      />
    </div>
  ));
  const [regions, setRegions] = React.useState<IRegion[]>([]);
  const [region, setRegion] = React.useState<string>("");
  const [shop, setShop] = React.useState<string>("");
  const [agents, setAgents] = React.useState<IAgentAdmin[]>([]);
  const [agent, setAgent] = React.useState<string>("");

  const loadingRegion = async () => {
    const res = await fetch("/api/settings/region", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    console.log(response);
    if (response.status === 200) {
      setRegions(response.data);
    }
  };
  const loadingAgentAdmin = async () => {
    const res = await fetch("/api/settings/agentadmin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (response.status === 200) {
      setAgents(response.data);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loadingRegion();
      await loadingAgentAdmin();
      setLoad(false);
    };
    initialize();
  }, []);
  const reset = () => {
    setRegion("");
    setFonction("");
    setInitiale({ codeAgent: "", nom: "", telephone: "" });
    setAgent("");
  };

  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoad(true);
    const method = edit ? "PUT" : "POST";
    try {
      const donners = {
        nom: initiale.nom,
        idvm: agent,
        codeAgent: initiale.codeAgent,
        account_manager,
        fonction,
        telephone: initiale.telephone,
        idZone: region,
        idShop: shop,
      };
      const dataSend = edit ? { ...donners, _id: edit._id } : donners;

      const res = await fetch("/api/settings/agents", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
      const response = await res.json();
      if (response.status === 200) {
        setDonner([response.data, ...donner]);
        toast("Agent registered successfully");
        setLoad(false);
        reset();
      } else {
        toast(JSON.stringify(response.data));
        setLoad(false);
      }
    } catch (error) {
      toast(JSON.stringify(error));
      setLoad(false);
    }
  };
  React.useEffect(() => {
    if (edit) {
      setFonction(edit?.fonction);
      setAccountManager(edit?.account_manager);
      setAgent(edit?.idvm ? edit?.idvm : "");
      setRegion(edit.codeZone);
      setShop(edit?.idShop);
      setInitiale({
        nom: edit?.nom,
        codeAgent: edit?.codeAgent,
        telephone: edit?.telephone,
      });
    }
  }, [edit]);

  return (
    <div>
      {load ? (
        <Loading type="Loading" />
      ) : (
        <>
          <div className="mb-3">
            <Label className="mb-3">Fonction</Label>
            <Combobox
              value={fonction}
              setValue={setFonction}
              data={fonctionvm}
            />
          </div>
          {inputs}
          <Label>Region</Label>
          <Combobox
            value={region}
            setValue={setRegion}
            data={regions.map((index) => {
              return {
                label: index.denomination,
                value: index.idZone,
              };
            })}
          />
          {region !== "" && (
            <div className="gap-3">
              <Label>Shop</Label>
              <Combobox
                value={shop}
                setValue={setShop}
                data={regions
                  .filter((x) => x.idZone === region)[0]
                  .shop.map((index) => {
                    return {
                      label: index.shop,
                      value: index.idShop,
                    };
                  })}
              />
            </div>
          )}
          <Label>
            This field is mandatory for staff to link the Visit Household
            account to their default tracker account.
          </Label>
          {agents.length > 0 && (
            <Combobox
              value={agent}
              setValue={setAgent}
              data={agents.map((index) => {
                return {
                  label: index.nom,
                  value: index.codeAgent,
                };
              })}
            />
          )}
          <div className="flex gap-3 mt-3">
            <Checkbox
              id="account"
              onClick={() => setAccountManager(!account_manager)}
              checked={account_manager}
            />
            <Label htmlFor="account">Is he an account manager ?</Label>
          </div>
          <Button onClick={(e) => sendData(e)} className="w-full mt-3">
            {edit ? <Edit /> : <Plus />}
            {edit ? "Modifier" : "Ajoutez un agent"}
          </Button>
        </>
      )}
    </div>
  );
}

export default Formulaire;
