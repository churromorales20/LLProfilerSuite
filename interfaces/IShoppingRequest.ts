import type { IOrderQueryItem } from "./IOrderQueryItem";

export interface IShoppingRequest {
  items?: IOrderQueryItem[];
  ip_address?: string;
}