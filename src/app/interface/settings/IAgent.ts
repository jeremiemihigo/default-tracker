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
  id: string;
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
