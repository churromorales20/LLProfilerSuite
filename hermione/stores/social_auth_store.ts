import { defineStore } from 'pinia'
import { adminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import type { IApiResponse } from '@ll-interfaces/IApiResponses';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { ISocialUrlResponse } from '@ll-interfaces/ISocialUrlResponse';
import type { ILoginResponse } from '@ll-interfaces/ILoginResponse';
//import type { IApiResponse } from '~/interfaces/IApiResponses';

export const socialAuthStore = defineStore('socialAuthStore', {
  state: () => ({
    error_code: null as number | null,
    is_working: false as boolean,
    url: '' as string,
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
  },
  actions: {
    async fetchSocialUrlAuth(type: string) {
      this.error_code = null
      this.is_working = true
      
      try {
        const response = await internalApiFetcher.post<ISocialUrlResponse>(`auth/social/url`, {
          type
        });

        if (response.code) {
          const error: ILLApiError<IApiResponse<ISocialUrlResponse>> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        this.url = response.data?.url as string;
        this.is_working = false
        
        return true
      } catch (error: any) {
        console.log('errorSSSSS', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }

        this.is_working = false
      }

      return false;
    },
    async confirmAuth(type: string, sign: string | null = null) {
      this.error_code = null
      this.is_working = true

      try {
        const response = await internalApiFetcher.post<ILoginResponse>(`auth/social/confirm`, {
          type,
          sign
        });

        if (response.code) {
          const error: ILLApiError<IApiResponse<ILoginResponse>> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        //this.url = response.data?.url as string;
        this.is_working = false
        
        return true
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }

        this.is_working = false
      }

      return false;
    },
  },
})
