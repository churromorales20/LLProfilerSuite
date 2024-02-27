import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import { apiFetcher } from "@ll-fetchers/llApiFetcher";
import type { IMemorial } from '@ll-interfaces/IMemorial';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    count: 0 as number,
    error_code: null as number | null,
    profile: {} as IMemorial,
    loaded: false as boolean,
    image_gallery_opened: false as boolean,
    is_subdomain: false as boolean,
    code: null as string | null,
    uname: null as string | null,
  }),
  getters: {
    isSubdomain: (state) => {
      return state.is_subdomain;
    },
    fullName: (state) => {
      return `${state.profile.first_name} ${state.profile.last_name}`;
    },
    isImageGalleryOpened: (state) => {
      return state.image_gallery_opened;
    },
    
  },
  actions: {
    setIsSubdomain(status: boolean) {
      this.is_subdomain = status;
    },
    toggleImageGallery(status: boolean) {
      this.image_gallery_opened = status;
    },
    setCode(code: string) {
      this.code = code;
    },
    async fetchByCode(code: string) {
      this.error_code = null;
      this.loaded = false;
      this.code = code;

      try {
        const response = await apiFetcher.get<IMemorial>(`profile/code/${this.code}`);
        
        if (response.code) { 
          const error: ILLApiError<IMemorial> = new Error(`${response.code}`);
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
