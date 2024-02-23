export interface ICreditCard {
  id? : number;
  card_number: string;
  cardholder_name: string;
  expiration_date: string;
  cvv: string;
}