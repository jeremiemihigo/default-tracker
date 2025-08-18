import { IFeedback } from "./IFeedbacks";
import { IShop } from "./settings/IAgent";

export interface ICombo {
  value: string;
  label: string;
}
export interface IPayement {
  account_id: string;
  shop_name: string;
  transaction_time: string;
  amount: number;
  processed_date: string;
  payment_status: string;
  provider_transact_reference: string;
  provider: string;
}
export interface IUploadClient {
  customer_id: string;
  customer_name: string;
  shop: string;
  par: string;
  region: string;
  cashattendu: number;
  cashPayer: number;
}
export interface ShopRegion {
  shop: string;
  action: number;
  decision: number;
  region: string;
}
export interface ITableauPar {
  label: string;
  data: number[];
}
export interface IDonner {
  validationFraude: number;
  validationField: number;
  awaiting_fields: number;
  awaiting_fraudes: number;
  vmfield: number;
  vmpo: number;
  refresh: number;
  act_decisions: ShopRegion[];
  regions: string[];
  tableau_pars: ITableauPar[];
}
export interface ISidebar {
  decision_field: number;
  decision_fraude: number;
  decision_portfolio: number;
}
export interface IPar120 {
  customer_id: string;
  customer_name: string;
  shop: string;
  region: string;
  track_by: string;
  current_payment_status: string;
  current_customer_status: string;
  daily_rate: number;
}
export interface IRapportPar120 {
  name: string;
  fonction: string;
  shop: IShop[];
  region: {
    denomination: string;
  };
  disponible: "Oui" | "Non";
  gap_vm: number;
  vm_moispasse: number;
  vm_moisactuel: number;
  Obj_visited: number;
  Obj_visited_by_others: number;
  not_visited_object: number;
  Total_to_track: number;
  "%visit_vs_target": number;
  Current_visit_target: number;
  "No_action_PAR_120+": number;
  "Realisation_PAR_120+": number;
  "Obj_PAR120+": number;
  "%_Realisation_default": number;
  Remaining_daily_action_target: number;
  all_visite_hier: number;
  hier_par120: number;
  action_hier: number;
  action_hier_visited: number;
}
export interface IDataRefresh {
  customer_id: string;
  customer_name: string;
  shop: string;
  region: string;
  tracker_par: string;
  current__status: {
    date_update: number;
    current_payment_status: string;
    current_customer_status: string;
  };
  observation: "No_action" | "Repossession" | "Reactivation";
  daily_rate: number;
  date_refresh: number;
  dejaPayer: number;
  feedback_staff: string;
  performance: string;
  staff_ayant_visite: string;
  feedback?: IFeedback[];
}
