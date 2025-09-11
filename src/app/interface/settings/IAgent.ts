export interface IShop {
  shop: string;
  adresse: string;
  idShop: string;
  idZone: string;
}
export interface IAgent {
  _id: string;
  nom: string;
  codeAgent: string;
  codeZone: string;
  fonction: string;
  idShop: string;
  telephone: string;
  active: boolean;
  account_manager: boolean;
  id: string;
  idvm?: string;
  first: boolean;
  createdAt: string;
  updatedAt: string;
  pass: string;
  resetBy?: string;
  region: {
    idZone: string;
    id: string;
    denomination: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  shop: IShop[];
}
export interface IAgentAdmin {
  nom: string;
  codeAgent: string;
  fonction: "superUser" | "admin" | "co";
  telephone: string;
  active: boolean;
  first: boolean;
  taches: string[];
  backOffice_plainte: boolean;
  plainte_callcenter: boolean;
  role: string;
  valueFilter: string[];
  validateShop: string[];
  plainteShops: string[];
  filename: string;
  poste: string;
  validationdt: boolean;
}
