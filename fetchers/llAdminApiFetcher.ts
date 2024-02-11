import { LLApiFetcher } from './llApiFetcher'
import { NodeEventContext } from "h3";

export class LLAdminApiFetcher extends LLApiFetcher {
  constructor(event: null | NodeEventContext = null) {
    super(event); 
    this.apiUrl += 'profiler_admin/'
  }
}

export const adminApiFetcher = new LLAdminApiFetcher();