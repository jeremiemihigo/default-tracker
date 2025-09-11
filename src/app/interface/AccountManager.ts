import { IVisite } from "./IVisites";
import { IAgent } from "./settings/IAgent";

export interface IUpload {
  unique_account_id: string;
  customer_name: string;
  sat: string;
  id_Account_manager: string;
  customer_lookup: string;
}
export interface IAccountManager {
  unique_account_id: string;
  customer_name: string;
  sat: string;
  id_Account_manager: string;
  customer_lookup: string;
  agent: IAgent[];
  visites: IVisite[];
}
