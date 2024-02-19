import { type MultiPartData } from 'h3';

export interface IImageSaverParams {
  image: MultiPartData;
  profile_code: string;
  height?: number;
  width?: number;
  type?: string;
}
