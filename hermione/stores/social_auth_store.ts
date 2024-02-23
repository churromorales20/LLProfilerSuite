import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { ISocialUrlResponse } from '@ll-interfaces/ISocialUrlResponse';
import type { ILoginResponse } from '@ll-interfaces/ILoginResponse';
//import type { IApiResponse } from '~/interfaces/IApiResponses';

export const socialAuthStore = defineStore('socialAuthStore', {
  state: () => ({
    error_code: null as number | null,
    is_working: false as boolean,
    url: '' as string,
    is_popup: false as boolean,
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    IsPopUp: (state) => {
      return state.is_popup;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
  },
  actions: {
    async fetchSocialUrlAuth(type: string, isPopUp: boolean = false) {
      this.error_code = null
      this.is_working = true
      
      try {
        const response = await internalApiFetcher.post<ISocialUrlResponse>(`auth/social/url`, {
          type,
          is_popup: isPopUp
        });

        if (response.code) {
          const error: ILLApiError<ISocialUrlResponse> = new Error(`${response.code}`);
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
          const error: ILLApiError<ILoginResponse> = new Error(`${response.code}`);
          error.response = response;
          throw error;
        }
        
        //this.url = response.data?.url as string;
        this.is_working = false
        this.is_popup = response.data?.is_popup!
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
