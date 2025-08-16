"use client";
import { IShowDataPar } from "@/app/interface/par120";
import { Combobox } from "@/app/Tools/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

type Props = {
  data: IShowDataPar;
  donner: IShowDataPar[];
  setDonner: React.Dispatch<React.SetStateAction<IShowDataPar[]>>;
};
const disponibleData = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];
function Formulaire({ data, setDonner, donner }: Props) {
  const [value, setValue] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [sending, setSending] = React.useState<boolean>(false);
  const sendData = async () => {
    try {
      setSending(true);
      const res = await fetch("/api/par120/actualisationpar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disponible: value !== "" ? value : data.disponible,
          nombre,
          codeAgent: data.codeAgent,
        }),
      });
      const response = await res.json();
      if (response.status === 200) {
        const filter = donner.map((x) =>
          x.codeAgent === data.codeAgent ? response.data : x
        );
        setDonner(filter);
      } else {
        toast(JSON.stringify(response.data));
      }
    } catch (error) {
      toast(JSON.stringify(error));
    }
  };
  return (
    <div>
      <div>
        <Input
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Objectif PAR 120+"
          value={nombre}
        />
      </div>
      <div className="mt-2 mb-2">
        <Combobox data={disponibleData} setValue={setValue} value={value} />
      </div>
      <div>
        <Button
          disabled={sending}
          onClick={() => sendData()}
          className="w-full"
        >
          Valider
        </Button>
      </div>
    </div>
  );
}

export default Formulaire;
