import type { ICurrencyInfo } from "./ICurrencyInfo";
import type { IOrderItem } from "./IOrderItem";

export interface IOrder {
  items: IOrderItem[];
  delivery: number;
  tax: number;
  currency: ICurrencyInfo;
}