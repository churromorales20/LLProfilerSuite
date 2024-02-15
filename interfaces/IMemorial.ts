import type { IProfileUIResponse } from "./IProfileUIResponse";

export interface IMemorial {
  id: number;
  code?: string;
  first_name: string;
  last_name: string;
  obituary?: string;
  born_place?: string;
  nickname?: string;
  born_date?: Date | null;
  death_date?: Date | null;
  death_place?: string | null;
  relationship?: string | null;
  bio?: string;
  is_active?: boolean;
  uname?: string;
  images?: string[];
  videos?: string[];
  avatar?: string;
  top_image?: string | null;
}
export interface IMemorialWithUI extends IMemorial {
  ui?: IProfileUIResponse
}