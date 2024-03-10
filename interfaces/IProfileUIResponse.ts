import type  { IBackgroundImageUI } from './IBackgroundImageUI'

export interface IProfileUIResponse {
  font_1_import?: string;
  font_1_rules?: string;
  font_2_import?: string;
  font_2_rules?: string;
  main_title_color?: string;
  main_title_size?: string;
  uname_text_color?: string;
  uname_text_size?: string;
  main_background_color?: string;
  main_background_image?: IBackgroundImageUI;
  rounded_corners_size?: string;
  box_background_color?: string;
  box_text_color?: string;
  box_text_size?: string;
  box_title_text_color?: string;
  box_title_text_size?: string;
  link_main_color?: string;
  link_secondary_color?: string;
}
