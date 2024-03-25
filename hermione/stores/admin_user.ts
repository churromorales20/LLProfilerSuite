import { defineStore } from 'pinia'
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import { adminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import type { ILoginResponse } from '@ll-interfaces/ILoginResponse';
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import type { IUserExtraInfo, IUserInfo } from '@ll-interfaces/IUserInfo';
import type { ISignUpRequest } from '@ll-interfaces/ISignUpRequest';
//import type { IApiResponse } from '~/interfaces/IApiResponses';

export const userAdminStore = defineStore('userAdminStore', {
  state: () => ({
    count: 0 as number,
    error_code: null as number | null,
    signup_error_code: null as number | null,
    error_code_user: null as number | null,
    is_working: false as boolean,
    is_subdomain: false as boolean,
    code: null as string | null,
    extra_info: null as IUserExtraInfo | null,
    phrase: '' as string,
    token_verified: false as boolean,
    token_confirmed: false as boolean,
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    showTourModal: (state) => {
      return state.extra_info!.tour_count! < 5;
    },
    dashboardPhrase: (state) => {
      return state.phrase;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    signUpIsErrored: (state) => {
      return state.signup_error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
    lastSingUpError: (state) => {
      return state.signup_error_code;
    },
    lastUserError: (state) => {
      return state.error_code_user;
    },
  },
  actions: {
    async verifyUserToken(isClient: boolean = false): Promise<boolean> {
      if (!this.token_verified) {
        this.error_code_user = null;
        try {
          const response = isClient 
            ? await internalApiFetcher.get<IUserInfo>(`auth/user/info`)
            : await adminApiFetcher.get<IUserInfo>(`auth/user/info`)
          
          if (response.code) {
            const error: ILLApiError<IUserInfo> = new Error(`${response.code}`);
            error.response = response;
            throw error;

          }

          this.phrase = response?.data!.phrase!;
          this.extra_info = response?.data!.extra_info!;
          this.token_confirmed = true;

          if (response?.data!.extra_info!.tour_count! >= 5) {
            const shopping = shoppingStore();
            shopping.hideTour();
          }
          
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
    },
    async signup(signUpInfo: ISignUpRequest) {
      this.signup_error_code = null

      try {
        const response = await internalApiFetcher.post<Object>(`auth/signup`, {
          email: signUpInfo.email, 
          password: signUpInfo.password,
          first_name: signUpInfo.first_name,
          last_name: signUpInfo.last_name,
        });
        
        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        return true
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.signup_error_code = error.response.code
        } else {
          this.signup_error_code = 500
        }
      }

      return false;
    },
    async checkEmailAvailability(emailValue: string) {
      try {
        const response = await internalApiFetcher.post<Object>(`auth/email/check`, {
          email: emailValue,
        });
        
        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        return true
      } catch (error: any) {
        console.log('error', error.response);
      }

      return false;
    },
    async sendRecoverMail(emailValue: string) {
      try {
        const response = await internalApiFetcher.post<Object>(`auth/recover`, {
          email: emailValue,
        });
        
        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        return true
      } catch (error: any) {
        console.log('error', error.response);
      }

      return false;
    },
    async confirmRecover(code: string, password: string) {
      try {
        
        const response = await internalApiFetcher.post<Object>(`auth/recover/confirm`,{
          code,
          password
        })
        
        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        return true
      } catch (error: any) {
        console.log('error', error.response);
      }

      return false;
    },
    async checkRecoverCode(code: string) {
      try {
        
        const response = await internalApiFetcher.get<Object>(`auth/recover/confirm?code=${code}`)
        
        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        return true
      } catch (error: any) {
        console.log('error', error.response);
      }

      return false;
    }
  },
})
