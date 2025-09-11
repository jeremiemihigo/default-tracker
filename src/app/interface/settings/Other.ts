export interface IRegion {
  idZone: string;
  denomination: string;
  shop: IShop[];
}
export interface IShop {
  shop: string;
  adresse: string;
  idShop: string;
  idZone: string;
}
