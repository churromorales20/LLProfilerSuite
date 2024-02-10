import type { IApiResponse } from "../interfaces/IApiResponses";
import type { ILoginResponse } from "../interfaces/ILoginResponse";

export class LLApiFetcher {
  protected apiUrl = `${process.env.LL_API_PROFILE}`;
  async post<T extends object | null>(service: string, data: Object): Promise<IApiResponse<T>> {

    return this._fetch<T>(service, 'POST', data);
  }

  async get<T extends object | null>(service: string): Promise<IApiResponse<T>> {

    return this._fetch<T>(service, 'GET'); 3

  }

  private _getAuthCookie(): null | ILoginResponse{
    const headers = useRequestHeaders(['cookie'])
    const cookies = headers.cookie?.split(';');

    try{
      const llFrameworkInfo = cookies?.find(function (cookie) {
        return cookie.trim().startsWith('LL_FRAMEWORK_INFO=');
      })?.trim().substring('LL_FRAMEWORK_INFO='.length);

      return llFrameworkInfo === undefined ? null : JSON.parse(llFrameworkInfo) as ILoginResponse;
    } catch (error: any) {
      return null;
    }
  }

  private async _fetch<T extends object | null>(service: string, type: string = "POST", data: Object = {}): Promise<IApiResponse<T>> {
    const toResponse: IApiResponse<T> = {
      result: 'success',
    }
    
    const authCookie = this._getAuthCookie();
    
    try {

      console.log('reqqqqq', {
        method: type === "GET" ? 'GET' : 'POST',
        body: type !== 'GET' ? data : null,
        headers: authCookie ? {
          'Authorization': `Bearer ${authCookie.auth_token.token}`,
        } : {},
      });
      

      const apiResponse = await (
        $fetch(`${this.apiUrl}${service}`, {
          method: type === "GET" ? 'GET' : 'POST',
          body: type !== 'GET' ? data : null,
          headers: authCookie ? {
            'Authorization': `Bearer ${authCookie.auth_token.token}`,
          } : {},
          async onResponseError({ request, response, options }) {
            toResponse.code = response.status;
            toResponse.result = 'error';
          },
        })
      ) as IApiResponse
      console.log('apiResponse', apiResponse);
      
      toResponse.data = apiResponse.data as T;
    } catch (error: any) {
      console.log('error', error);

      let error_code = 500;
      if (error.response) {
        error_code = error.response.status
      }
      toResponse.code = error_code;
      toResponse.result = error;
    }

    return toResponse;
  }
}

export const apiFetcher = new LLApiFetcher();
