export interface OrderData{
  id:number,
  code: string;
  code_year:number;
  orderunits: [{
    order: string,
    product: string,
    amount: number,
    price: number
  }];
  date_registered: string;
  customer: string;
  creator:string;
}
