import _ from "lodash";
import { IFeedback } from "../interface/IFeedbacks";

export function excelSerialToJSDate(serial: number) {
  let days = serial;
  if (serial >= 60) {
    days -= 1;
  }

  const epoch = Date.UTC(1899, 11, 31);
  const msPerDay = 24 * 60 * 60 * 1000;
  return new Date(epoch + days * msPerDay).toLocaleDateString();
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
