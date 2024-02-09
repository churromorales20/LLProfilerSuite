import { defineStore } from 'pinia'
import type { IProfileResponse } from '~/interfaces/IProfileResponse';
import type { ILLApiError } from '~/interfaces/ILLApiError';
import { apiFetcher } from "@/server/utils/llApiFetcher";
import type { IApiResponse } from '~/interfaces/IApiResponses';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    count: 0 as number,
    error_code: null as number | null,
    profile: {} as IProfileResponse,
    loaded: false as boolean,
    is_subdomain: false as boolean,
    code: null as string | null,
  }),
  getters: {
    isSubdomain: (state) => {
      return state.is_subdomain;
    },
  },
  actions: {
    setIsSubdomain(status: boolean) {
      this.is_subdomain = status;
    },
    setCode(code: string) {
      this.code = code;
    },
    async fetch() {
      this.error_code = null
      this.loaded = false
      
      try {
        const response = await apiFetcher.get<IProfileResponse>(`profile/code/${this.code}`);
        
        if (response.code) { 
          const error: ILLApiError<IApiResponse<IProfileResponse>> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        this.profile = response.data!;
        this.loaded = true

        return true       
      } catch (error: any) {
        console.log('error', error);
        
        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }

      }
      return false;
    },
  },
})
