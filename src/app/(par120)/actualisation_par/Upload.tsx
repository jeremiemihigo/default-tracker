import Excel from "@/app/Tools/Excel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import * as xlsx from "xlsx";

type Props = {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};
type IUpload = {
  codeAgent: string;
  count: number;
};
function Uploading({ load, setLoad }: Props) {
  const [donnerupload, setDonnerUpload] = useState<IUpload[]>([]);
  const column = ["codeAgent", "count"];
  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files || files.length === 0) {
        toast("No file selected.");
        setLoad(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        try {
          const donner_ = ev.target?.result;
          if (!donner_) {
            throw new Error("Empty file data");
          }
          const workbook = xlsx.read(donner_, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: IUpload[] = xlsx.utils.sheet_to_json(worksheet);
          const colonnes = Object.keys(json[0]);
          const notexist = column.filter((x) => !colonnes.includes(x));
          if (notexist.length > 0) {
            toast("Certaines colonnes ne sont pas dans le fichier uploader");
            setLoad(false);
          } else {
            const donners = json.map((item) => {
              return {
                codeAgent: item.codeAgent,
                count: item.count,
              };
            });
            setDonnerUpload(donners);
            setLoad(false);
          }
        } catch (innerErr) {
          toast(JSON.stringify(innerErr));
        }
      };

      reader.onerror = () => {
        toast("Failed to read file.");
        setLoad(false);
      };

      reader.readAsArrayBuffer(files[0]);
    } catch (error) {
      console.log(error);
      alert("Error " + (error as Error).message);
      setLoad(false);
    }
  };

  const template = [
    {
      codeAgent: "",
      count: "",
    },
  ];
  console.log(donnerupload);
  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoad(true);
    try {
      const response = await fetch("/api/par120/actualisationpar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnerupload),
      });
      const res = await response.json();
      if (res.status === 200) {
        toast("Opération effectuée");
        window.location.replace("/actualisation_par");
        setLoad(false);
      } else {
        toast(res.data);
        setLoad(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        console.log("An unknown error occurred", error);
      }
    }
  };
  console.log(donnerupload);
  return (
    <div className="flex w-full items-center gap-3">
      <Input
        accept=".xlsx"
        onChange={(e) => readUploadFile(e)}
        id="refresh_"
        name="refresh_"
        className="w-lg"
        type="file"
      />
      {donnerupload.length > 0 && (
        <Button disabled={load} onClick={(event) => sendData(event)}>
          Submit
        </Button>
      )}

      <Excel
        data={template}
        filename="Template Obj_PAR120"
        title="Download template"
      />
    </div>
  );
}

export default Uploading;
