import type { IGraveyardInfo } from "./IGraveyardInfo";
import type { IMemorialMisc } from "./IMemorialMisc";
import type { IProfileUIResponse } from "./IProfileUIResponse";

interface IMemorialSettings {
  condolences_wall: boolean;
  condolences_wall_default_status: string;
  language: string;
  timezone: string;
  date_format: string;
}

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
  is_published?: boolean;
  uname?: string;
  images?: string[];
  videos?: string[];
  avatar?: string;
  top_image?: string | null;
  custom_ui: IProfileUIResponse;
  settings: IMemorialSettings;
  grave_yard_info: IGraveyardInfo | null;
  misc: IMemorialMisc | null
}