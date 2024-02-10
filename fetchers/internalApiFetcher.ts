import type { IApiResponse } from "../interfaces/IApiResponses";

class LLInternalApiFetcher {
  private apiPAth = `/api/`;
  
  async post<T extends object | null>(service: string, data: Object): Promise<IApiResponse<T>> {
    
    return this._fetch<T>(service, 'POST', data);
  }

  async get<T extends object | null>(service: string): Promise<IApiResponse<T>> {
    
    return this._fetch<T>(service, 'GET');3
    
  }

  private async _fetch<T extends object | null>(service: string, type: string = "POST", data: Object = {}): Promise<IApiResponse<T>> {
    const toResponse: IApiResponse<T> = {
      result: 'success',
    }

    try {
      const apiResponse = await (
        type !== 'POST' ? 
        $fetch(`${this.apiPAth}${service}`,{
          async onResponseError({ request, response, options }) {
            toResponse.code = response.status;
            toResponse.result = 'error';
          }
        }) : 
        $fetch(`${this.apiPAth}${service}`, {
          method: 'POST',
          body: data,
          async onResponseError({ request, response, options }) {
            toResponse.code = response.status;
            toResponse.result = 'error';
          },
        })
      ) as IApiResponse
      
      toResponse.data = apiResponse.data as T;
    } catch (error: any) {
      console.log('error', error);
      
    }

    return toResponse;
  }
}

export const internalApiFetcher = new LLInternalApiFetcher();
