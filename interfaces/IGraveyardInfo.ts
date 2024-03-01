import type { IPlaceDetailedItem } from "./IAutocompleteItem";

export interface IGraveyardInfo extends IPlaceDetailedItem {
  internal_steps?: string;
}

export enum GraveyardInfoFields {
  InternalSteps = 'internal_steps',
  Name = 'name',
  City = 'city',
  State = 'state',
  Country = 'country',
}