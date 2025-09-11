"use client";
import HeaderComponent from "@/app/header/Header";
import { IPayement } from "@/app/interface/IOther";
import Loading from "@/app/Tools/loading";
import React from "react";
import Tableau from "./Tableau";
import UploadingPayment from "./Uploading";

function Payements() {
  const [load, setLoad] = React.useState<boolean>(true);
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
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loadingData();
      setLoad(false);
    };
    initialize();
  }, []);
  return (
    <HeaderComponent title="Upload payments">
      {load ? (
        <Loading type="Loading" />
      ) : (
        <>
          <UploadingPayment load={load} setLoad={setLoad} data={data} />
          <Tableau
            load={load}
            setLoad={setLoad}
            data={data}
            setData={setData}
          />
        </>
      )}
    </HeaderComponent>
  );
}

export default Payements;
