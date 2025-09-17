"use client";
import { IPar120, IPar120Refresh } from "@/app/interface/IOther";
import { lien_dt } from "@/app/static/lien";
import Excel from "@/app/Tools/Excel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import * as xlsx from "xlsx";

function Refresh() {
  const [data, setData] = React.useState<IPar120[] | IPar120Refresh[]>([]);
  const [sending, setSending] = React.useState<boolean>(false);

  const columnRefresh = [
    "customer_id",
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
        const notexist_refresh = columnRefresh.filter(
          (x) => !colonnes.includes(x)
        );

        if (notexist_refresh.length > 0) {
          toast("Colonnes manquantes: " + notexist_refresh.join(", "));
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

  const templateRefresh = [
    {
      customer_id: "",
      current_payment_status: "",
      current_customer_status: "",
    },
  ];

  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${lien_dt}/refreshStatus`,
        { data },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        window.location.replace("/customer_par120");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-6">
          Upload File to refresh status
        </h1>

        {/* Zone drag & drop */}
        <label
          htmlFor="filecustomer"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer p-8 hover:bg-gray-100 transition"
        >
          <p className="text-gray-600 mb-2">cliquez pour choisir le fichier</p>
          <Input
            accept=".xlsx"
            onChange={(e) => readUploadFile(e)}
            id="filecustomer"
            name="filecustomer"
            type="file"
            className="hidden"
          />
        </label>

        {/* Bouton */}
        <Button
          className="w-full mt-6"
          disabled={sending || data.length === 0}
          onClick={(event) => sendData(event)}
        >
          {sending ? "Envoi en cours..." : "Refresh status"}
        </Button>

        {/* Lien template */}
        <div className="mt-4">
          <Excel
            data={templateRefresh}
            filename="Refresh status"
            title="Download template"
          />
        </div>
      </div>
    </div>
  );
}

export default Refresh;
