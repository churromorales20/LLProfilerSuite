import { defineStore } from 'pinia'
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import { adminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import type { ILoginResponse } from '@ll-interfaces/ILoginResponse';
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import type { IUserInfo } from '@ll-interfaces/IUserInfo';
//import type { IApiResponse } from '~/interfaces/IApiResponses';

export const userAdminStore = defineStore('userAdminStore', {
  state: () => ({
    count: 0 as number,
    error_code: null as number | null,
    error_code_user: null as number | null,
    //profile: {} as IProfileResponse,
    is_working: false as boolean,
    is_subdomain: false as boolean,
    code: null as string | null,
    token_verified: false as boolean,
    token_confirmed: false as boolean,
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
    lastUserError: (state) => {
      return state.error_code_user;
    },
  },
  actions: {
    async verifyUserToken() {
      if (!this.token_verified) {
        this.error_code_user = null;
        try {
          const response = await adminApiFetcher.get<IUserInfo>(`auth/user/info`);
          
          if (response.code) {
            const error: ILLApiError<IUserInfo> = new Error(`${response.code}`);
            error.response = response;
            throw error;

          }

          this.token_confirmed = true;
          
        } catch (error: any) {
          console.log('error', error.response);

          if (error.response) {
            this.error_code_user = error.response.code
          } else {
            this.error_code_user = 500
          }

          this.is_working = false
        }
        
        this.token_verified = true
        
      }

      return this.token_confirmed;
    },
    async login(email: string, password: string) {
      this.error_code = null
      this.is_working = true

      try {
        const response = await internalApiFetcher.post<ILoginResponse>(`auth/login`, {
          email, 
          password
        });
        
        if (response.code) {
          const error: ILLApiError<ILoginResponse> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        this.is_working = false
        this.token_verified = true
        this.token_confirmed = true
        
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
    }
  },
})
