export interface IShippingAddress {
  id?: number;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  reference?: string;
  postal_code: string;
  country: string;
  phone_number?: string | null;
  is_default?: boolean;
}