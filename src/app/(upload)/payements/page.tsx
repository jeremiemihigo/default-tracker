"use client";
import HeaderComponent from "@/app/header/Header";
import React from "react";
import Tableau from "./Tableau";
import UploadingPayment from "./Uploading";

function Payements() {
  const [load, setLoad] = React.useState<boolean>(true);
  return (
    <HeaderComponent title="Upload payments">
      <UploadingPayment load={load} setLoad={setLoad} />
      <Tableau load={load} setLoad={setLoad} />
    </HeaderComponent>
  );
}

export default Payements;
