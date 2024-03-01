export interface IAutocompleteItem {
  description: string;
  place_id: string;
  main_text: string;
  secondary_text: string;
}

export interface IPlaceAutocompleteParams {
  term: string;
  type: string;
  session: string;
}

export interface IPlacesResponse {
  items: IAutocompleteItem[];
  session: string;
}

export interface IPlaceItem {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  }
}

export interface IPlaceDetailedItem {
  name: string;
  place_id?: string;
  phone_number?: string;
  city: string;
  state?: string;
  secondary?: string;
  country: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}
export interface IPlacesGoogleResponse {
  predictions: IPlaceItem[];
}

export interface IGoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface IGoogleLocation {
  lat: number;
  lng: number;
}

interface IGoogleGeometry {
  location: IGoogleLocation;
}

interface IGooglePlaceResult {
  address_components: IGoogleAddressComponent[];
  formatted_phone_number: string;
  geometry: IGoogleGeometry;
  international_phone_number: string;
  name: string;
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  wheelchair_accessible_entrance: boolean;
}

export interface IPlaceDetailRawResponse {
  result: IGooglePlaceResult;
  status: string;
}
