import type { IAutocompleteItem, IPlacesResponse, IPlaceDetailedItem } from '@ll-interfaces/IAutocompleteItem';
import { defineStore } from 'pinia'
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { ILLApiError } from '@ll-interfaces/ILLApiError';

export const autocompleteStore = defineStore('autocompleteStore', {
  state: () => ({
    timeout_tick: null as NodeJS.Timeout | null,
    session: '' as string
  }),
  actions: {
    async getInfo(placeId: string): Promise<IPlaceDetailedItem | null> {
      try {
        const response = await internalApiFetcher.get<IPlaceDetailedItem>(`places/info?place_id=${placeId}&session=${this.session}`);

        if (response.code) {
          const error: ILLApiError<IPlaceDetailedItem> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        return response.data!

      } catch (error: any) {
        console.log('error', error.response);

        return null;
      }
    },
    async fetch(term: string, type: string): Promise<IAutocompleteItem[]>{
      if (term.length < 4) {
        return [];
      }

      if (this.timeout_tick !== null) {
        clearTimeout(this.timeout_tick);
      }

      const fetchPromise = new Promise<IAutocompleteItem[]>((resolve) => {
        this.timeout_tick = setTimeout(async () => {
          this.timeout_tick = null;
          try {
            const response = await internalApiFetcher.get<IPlacesResponse>(`places/autocomplete?type=${type}&term=${term}&session=${this.session}`);

            if (response.code) {
              const error: ILLApiError<IPlacesResponse> = new Error(`${response.code}`);
              error.response = response;
              throw error;

            }
            this.session = response.data?.session!;
            resolve(response.data?.items!)
            
          } catch (error: any) {
            console.log('error', error.response);
          }
          resolve([])
        }, 400);
      });

      return await fetchPromise;
    }
  },
})
