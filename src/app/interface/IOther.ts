import { IFeedback } from "./IFeedbacks";
import { IShop } from "./settings/IAgent";

export interface ICombo {
  value: string;
  label: string;
}

export interface IPayement {
  account_id: string;
  transaction_time: string;
  amount: number;
  provider_transact_reference: string;
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
interface IJ {
  date_action: number;
  nombre: number;
}
export interface IDonner {
  validationFraude: number;
  validationField: number;
  awaiting_fields: number;
  awaiting_fraudes: number;
  vmfield: number;
  vmpo: number;
  refresh: number;
  dashjournalier: IJ[];
  act_decisions: ShopRegion[];
  regions: [];
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
  par: string;
  shop: string;
  region: string;
  track_by: string;
  current_payment_status: string;
  current_customer_status: string;
  daily_rate: number;
}
export interface IPar120Refresh {
  customer_id: string;

  current_payment_status: string;
  current_customer_status: string;
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
  _id: string;
  customer_id: string;
  customer_name: string;
  shop: string;
  region: string;
  par: string;
  observation: "No_action" | "Repossession" | "Reactivation" | "Opt-out";
  daily_rate: number;
  dejaPayer: number;
  feedback_staff: string;
  performance: string;
  date_refresh: string;
  tracker_par: string;
  feedback?: IFeedback[];
}
export interface IRapportDecision {
  decision: string;
  createdBy: string;
  codeclient: string;
  customer_name: string;
  region: string;
  shop: string;
  par: string;
  statut: string;
  departement: string;
  verifiedby: string;
}
