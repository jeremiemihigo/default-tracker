import _ from "lodash";
import { IFeedback } from "../interface/IFeedbacks";

export function excelSerialToJSDate(serial: number) {
  let days = serial;

  // Ajustement pour le bug Excel sur 1900
  if (serial >= 60) {
    days -= 1;
  }

  const epoch = Date.UTC(1899, 11, 31);
  const msPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(epoch + days * msPerDay);

  // Format YYYY-MM-DD
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return new Date(`${year}-${month}-${day}`).getTime();
}

export const returnFeedback = (id: string, feedporto: IFeedback[]) => {
  if (_.filter(feedporto, { idFeedback: id }).length > 0) {
    return _.filter(feedporto, { idFeedback: id })[0].title;
  } else {
    return id;
  }
};
export function capitalize(str: string) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  } else {
    return str;
  }
}
export const fonctionvm = [
  { label: "Technicien (TECH)", value: "tech" },
  { label: "Agent (SA)", value: "agent" },
  { label: "Zonal_Business_Manager", value: "ZBM" },
  { label: "Process_Officer", value: "PO" },
  { label: "RS", value: "RS" },
  { label: "Shop_Manager", value: "SM" },
  { label: "Team_leader", value: "TL" },
  { label: "Stagiaire", value: "stagiaire" },
  { label: "Agent_de_recouvrement_(AR)", value: "AR" },
  { label: "Shop_Assistante", value: "shop_assistante" },
];
