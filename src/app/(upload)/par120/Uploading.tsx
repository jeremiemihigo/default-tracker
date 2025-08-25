import { IPar120, IPar120Refresh } from "@/app/interface/IOther";
import { lien_dt } from "@/app/static/lien";
import { Combobox } from "@/app/Tools/combobox";
import Excel from "@/app/Tools/Excel";
import Popup from "@/app/Tools/Popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import * as xlsx from "xlsx";

const liens = [
  { value: "refreshStatus", label: "Refresh status" },
  { value: "uploadFilepar120", label: "Add customers" },
];

function UploadingPar120() {
  const [data, setData] = React.useState<IPar120[] | IPar120Refresh[]>([]);
  const [sending, setSending] = React.useState<boolean>(false);
  const [lien, setLien] = React.useState<string>("");
  const column = [
    "customer_id", //Upload
    "customer_name", //Upload
    "shop", //Upload
    "region", //Upload
    "track_by", //Upload
    "current_payment_status",
    "current_customer_status",
    "daily_rate",
    "par",
  ];
  const columnRefresh = [
    "customer_id", //Upload
    "current_payment_status",
    "current_customer_status",
  ];
  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSending(true);
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast("No file selected.");
      setSending(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      try {
        const donner = ev.target?.result;
        if (!donner) throw new Error("Empty file data");
        const workbook = xlsx.read(donner, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: IPar120[] = xlsx.utils.sheet_to_json(worksheet);

        if (!json.length) {
          toast("Le fichier est vide.");
          return;
        }
        const colonnes = Object.keys(json[0]);
        const notexist_add = column.filter((x) => !colonnes.includes(x));
        const notexist_refresh = columnRefresh.filter(
          (x) => !colonnes.includes(x)
        );

        if (
          (lien === "refreshStatus" && notexist_refresh.length > 0) ||
          (lien === "uploadFilepar120" && notexist_add.length > 0)
        ) {
          const colonnesmanquant =
            lien === "refreshStatus" ? notexist_refresh : notexist_add;
          toast("Colonnes manquantes: " + colonnesmanquant.join(", "));
          return;
        }
        setData(json);
      } catch (err) {
        toast("Erreur: " + (err as Error).message);
      } finally {
        setSending(false);
      }
    };

    reader.onerror = () => {
      toast("Failed to read file.");
      setSending(false);
    };

    reader.readAsArrayBuffer(files[0]);
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
  const templateRefresh = [
    {
      customer_id: "", //Upload
      current_payment_status: "",
      current_customer_status: "",
    },
  ];
  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${lien_dt}/${lien}`,
        { data },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        window.location.replace("/par120");
      } else {
        toast(response.data);
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
    <div className=" flex gap-3 mb-2 p-2">
      <Popup
        title="Upload or refresh customer"
        component={
          <div>
            <div>
              <Combobox data={liens} value={lien} setValue={setLien} />
            </div>
            <div className="mt-3">
              {lien !== "" && (
                <Input
                  accept=".xlsx"
                  onChange={(e) => readUploadFile(e)}
                  id="filecustomer"
                  name="filecustomer"
                  type="file"
                />
              )}
            </div>

            <div className="mt-2">
              <Button
                className="w-full"
                disabled={sending || data.length === 0 ? true : false}
                onClick={(event) => sendData(event)}
              >
                {lien === "refreshStatus" ? "Refresh status" : "Submit"}
              </Button>
            </div>
          </div>
        }
        btnname="Upload or refresh customer"
      />
      <Excel
        data={template}
        filename="Template PAR 120+"
        title="Download template"
      />
      <Excel
        data={templateRefresh}
        filename="Refresh status"
        title="Template Refresh"
      />
    </div>
  );
}

export default UploadingPar120;
