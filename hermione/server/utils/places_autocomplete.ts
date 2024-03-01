import { IAutocompleteItem, IPlaceItem, IPlaceAutocompleteParams, IPlacesGoogleResponse, IPlacesResponse, IPlaceDetailedItem, IPlaceDetailRawResponse, IGoogleAddressComponent } from "@ll-interfaces/IAutocompleteItem";

export class LLPlacesAutocomplete {
  private googlePlacesBase = 'https://maps.googleapis.com/maps/api/';

  async fetch({ term, type, session }: IPlaceAutocompleteParams): Promise<IPlacesResponse>{
    const localSession = session !== '' ? session : this._generateSession(20);
    const response_raw = await $fetch<IPlacesGoogleResponse>(`${this.googlePlacesBase}place/autocomplete/json?input=${term}&types=${type}&sessiontoken=${localSession}&key=${process.env.GOOGLE_PLACES_KEY}`);
    
    return {
      items: response_raw.predictions.map((prediction: IPlaceItem) => {
                return {
                  place_id: prediction.place_id,
                  description: prediction.description,
                  main_text: prediction.structured_formatting.main_text,
                  secondary_text: prediction.structured_formatting.secondary_text
                }
              }),
      session: localSession
    }
  }

  async placeInfo(placeId: string, session: string): Promise<IPlaceDetailedItem> {
    const response_raw = await $fetch<IPlaceDetailRawResponse>(`${this.googlePlacesBase}place/details/json?place_id=${placeId}&sessiontoken=${session}&key=${process.env.GOOGLE_PLACES_KEY}`);
    
    return {
      name: response_raw.result.name,
      place_id: placeId,
      phone_number: response_raw.result.formatted_phone_number,
      city: this.getAddressComponentValue(response_raw.result.address_components, 'locality'),
      state: this.getAddressComponentValue(response_raw.result.address_components, 'administrative_area_level_1'),
      country: this.getAddressComponentValue(response_raw.result.address_components, 'country'),
      secondary: this.getAddressComponentValue(response_raw.result.address_components, 'administrative_area_level_2'),
      country_code: this.getAddressComponentValue(response_raw.result.address_components, 'country', true),
      latitude: response_raw.result.geometry.location.lat,
      longitude: response_raw.result.geometry.location.lng,
    }
  }

  private getAddressComponentValue(addressComponents: IGoogleAddressComponent[], componentName: string, isShort: boolean = false): string {
    for (const component of addressComponents) {
      if (component.types.includes(componentName)) {
        return isShort ? component.short_name : component.long_name;
      }
    }
    return '';
  }

  private _generateSession(len: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|\\:;"\'<>,.?/';

    for (let i = 0; i < len; i++) {
      const indice = Math.floor(Math.random() * characters.length);
      result += characters.charAt(indice);
    }

    return result;
  }
}