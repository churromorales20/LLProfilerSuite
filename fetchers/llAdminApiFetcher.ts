import { LLApiFetcher } from './llApiFetcher'

class LLAdminApiFetcher extends LLApiFetcher {
  constructor() {
    super(); 
    this.apiUrl += 'profiler_admin/'
  }
}

export const adminApiFetcher = new LLAdminApiFetcher();