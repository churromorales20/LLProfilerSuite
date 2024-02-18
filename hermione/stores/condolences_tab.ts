import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { ICondolenceEntry } from '@ll-interfaces/ICondolenceEntry';
import type { IOptionNameValue } from '@ll-interfaces/IOptionNameValue';
import type { IPageInfiniteInfo } from '@ll-interfaces/IPageInfiniteInfo';

export const condolencesTabStore = defineStore('condolencesTabStore', {
  state: () => ({
    error_code: null as number | null,
    memorial_id: null as number | null,
    list_total_records: null as number | null,
    is_working: true as boolean,
    is_filtering: false as boolean,
    is_loading_more: false as boolean,
    profile_code: null as string | null,
    list: [] as ICondolenceEntry[],
    filters: {
      status: 'PENDING' as string,
      last_date: '' as string
    },
    status_options: [] as IOptionNameValue[]
  }),
  getters: {
    isLoadingMore: (state) => {
      return state.is_loading_more;
    },
    isWorking: (state) => {
      return state.is_working;
    },
    isFiltering: (state) => {
      return state.is_filtering;
    },
    totaEntriesRemaining: (state) => {
      return state.list_total_records! - state.list.length;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
    statusOptions: (state) => {
      return state.status_options;
    },
  },
  actions: {
    initStatuses (options: IOptionNameValue[]) {
      this.status_options = options;
    },
    async setStatus (newStatus: string) {
      this.is_filtering = true;
      this.filters.status = newStatus;
      this.list_total_records = null;

      await this._fetchList();

      this.is_filtering = false;
    },
    async loadMoreEntries () {
      this.is_loading_more = true;
      this.filters.last_date = this.list[this.list.length - 1].created_at as unknown as string
      const wallPageInfo = await this._fetch();

      if (wallPageInfo) {
        this.list = [
          ...this.list,
          ...wallPageInfo!.items!
        ];
      }
      this.is_loading_more = false;
      this.filters.last_date = '';
    },
    removeEntryByIndex (indexToDelete: number) {
      this.list = this.list.filter((element, index) => index !== indexToDelete);
    },
    async updateStatus(index: number, newStatus: string) {
      try {
        const originalStatus = this.list[index].status;
        
        this.list[index].status = newStatus;
        const response = await internalApiFetcher
          .post<Object>
          (`memorial/${this.memorial_id}/wall/entry/status`, {
            new_status: newStatus,
            entry_id: this.list[index].entry_id
          });

        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          this.list[index].status = originalStatus;
          error.response = response;
          throw error;

        }

        this.list[index].status = newStatus;
        this.removeEntryByIndex(index);
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
        this.is_working = false;
      }
    },
    async fetch(code: string, id: number) {
      if (code !== this.profile_code) {
        this.profile_code = code;
        this.memorial_id = id;
        this.list_total_records = null;
        this.is_working = true;

        await this._fetchList()

        this.is_working = false;
      }
    }, 
    async _fetchList() {
      const wallPageInfo = await this._fetch();
      
      if (wallPageInfo) {
        if (this.list_total_records === null) {
          this.list_total_records = wallPageInfo!.total_items!
        }

        this.list = wallPageInfo!.items!
      }
    },
    async _fetch(): Promise<IPageInfiniteInfo<ICondolenceEntry> | null> {
      try {
        this.error_code = null;
        const response = await internalApiFetcher
          .get<IPageInfiniteInfo<ICondolenceEntry>>
          (`memorial/${this.memorial_id}/wall?status=${this.filters.status}${this.filters.last_date !== '' ? `&last_date=${this.filters.last_date}` : ''}`);

        if (response.code) {
          const error: ILLApiError<IPageInfiniteInfo<ICondolenceEntry>> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        return response.data!;
        
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
        return null;
      }
    }
  },
})
