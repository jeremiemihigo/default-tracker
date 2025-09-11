"use client";
import HeaderComponent from "@/app/header/Header";
import { IUpload } from "@/app/interface/AccountManager";
import { account_manager } from "@/app/static/lien";
import Excel from "@/app/Tools/Excel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import * as xlsx from "xlsx";

function UploadingPayment() {
  const [load, setLoad] = React.useState<boolean>(false);
  const [donner, setDonner] = React.useState<IUpload[]>([]);
  const [token, setToken] = React.useState<string>("");
  const column = [
    "unique_account_id",
    "customer_name",
    "sat",
    "id_Account_manager",
    "customer_lookup",
  ];
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
            toast("Certaines colonnes ne sont pas dans le fichier uploader", {
              duration: 5000,
            });
            return;
          } else {
            setDonner(json);
          }
        } catch (innerErr) {
          alert(JSON.stringify(innerErr));
          return;
        } finally {
          setLoad(false);
        }
      };
      reader.onerror = () => {
        toast("Failed to read file.");
        setLoad(false);
      };

      reader.readAsArrayBuffer(files[0]);
    } catch (error) {
      alert("Error " + (error as Error).message);
    }
  };

  const template = [
    {
      unique_account_id: "",
      customer_name: "",
      sat: "",
      id_Account_manager: "",
      customer_lookup: "",
    },
  ];
  const sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!token) {
      toast("Authentication token not found. Please login again.");
      setLoad(false);
      return;
    }
    setLoad(true);
    try {
      const res = await axios.post(
        `${account_manager}/addAccountManager`,
        { data: donner },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          maxBodyLength: Infinity, // important pour axios
          maxContentLength: Infinity,
        }
      );
      if (res.status === 200) {
        toast("Operation completed successfully");
        return;
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
  React.useEffect(() => {
    const initialize = async () => {
      const res = await fetch("/api/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status === 200) {
        setToken(response.token);
      }
    };
    initialize();
  }, []);

  return (
    <HeaderComponent title="Upload Customers">
      <div className="flex w-full items-center gap-3">
        <Input
          accept=".xlsx"
          onChange={(e) => readUploadFile(e)}
          id="payements"
          name="payements"
          className="w-lg"
          type="file"
        />
        {donner.length > 0 && (
          <Button disabled={load} onClick={(event) => sendData(event)}>
            Submit
          </Button>
        )}

        <Excel
          data={template}
          filename="Template Account manager"
          title="Download template"
        />
      </div>
    </HeaderComponent>
  );
}

export default UploadingPayment;
