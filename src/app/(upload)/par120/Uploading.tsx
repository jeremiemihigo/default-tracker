import { IPar120 } from "@/app/interface/IOther";
import Excel from "@/app/Tools/Excel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";
import * as xlsx from "xlsx";

function UploadingPar120() {
  const [data, setData] = React.useState<IPar120[]>([]);
  const [sending, setSending] = React.useState<boolean>(false);
  const column = [
    "customer_id", //Upload
    "customer_name", //Upload
    "shop", //Upload
    "region", //Upload
    "track_by", //Upload
    "current_payment_status",
    "current_customer_status",
    "daily_rate",
  ];
  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      const files = e.target.files;
      if (!files || files.length === 0) {
        toast("No file selected.");
        setSending(false);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        try {
          const data = ev.target?.result;
          if (!data) {
            throw new Error("Empty file data");
          }
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json: IPar120[] = xlsx.utils.sheet_to_json(worksheet);

          const colonnes = Object.keys(json[0]);
          const notexist = column.filter((x) => !colonnes.includes(x));

          if (notexist.length > 0) {
            toast("Certaines colonnes ne sont pas dans le fichier uploader");
            return;
          } else {
            setData(json);
          }
        } catch (innerErr) {
          alert(JSON.stringify(innerErr));
          return;
        } finally {
          setSending(false);
        }
      };

      reader.onerror = () => {
        toast("Failed to read file.");
        setSending(false);
      };

      reader.readAsArrayBuffer(files[0]);
    } catch (error) {
      alert("Error " + (error as Error).message);
      setSending(false);
    }
  };

  const template = [
    {
      customer_id: "", //Upload
      customer_name: "", //Upload
      shop: "", //Upload
      region: "", //Upload
      track_by: "", //Upload
      current_payment_status: "",
      current_customer_status: "",
      daily_rate: "",
    },
  ];
  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSending(true);
    try {
      const response = await fetch("/api/par120", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === 200) {
        window.location.replace("/par120");
      } else {
        toast(res.data);
        setSending(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        console.log("An unknown error occurred", error);
      }
    }
  };
  return (
    <div className="flex w-full items-center gap-3">
      <Input
        accept=".xlsx"
        onChange={(e) => readUploadFile(e)}
        id="picture"
        className="w-lg"
        type="file"
      />
      {data.length > 0 && (
        <Button disabled={sending} onClick={(event) => sendData(event)}>
          Submit
        </Button>
      )}
      <Excel
        data={template}
        filename="Template PAR 120+"
        title="Download template"
      />
    </div>
  );
}

export default UploadingPar120;
