"use client";
import HeaderComponent from "@/app/header/Header";
import Tableau from "./Tableau";
import UploadingPar120 from "./Uploading";

function UploaPar120() {
  return (
    <HeaderComponent title="Upload PAR 120+">
      <UploadingPar120 />
      <Tableau />
    </HeaderComponent>
  );
}

export default UploaPar120;
