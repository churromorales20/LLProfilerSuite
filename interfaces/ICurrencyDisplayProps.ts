export interface ICurrencyDisplayProps {
  nullValue?: string | number;
  reverseFill?: boolean;
  prefill?: boolean;
  precision?: number;
  minimumFractionDigits?: number;
  decimal?: string;
  min?: number;
  max?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
}