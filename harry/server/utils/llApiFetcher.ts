import { IApiResponse, ILLApiResponseRaw } from "~/interfaces/IApiResponses";

class LLApiFetcher {
  private apiUrl = `${process.env.LL_API_PROFILE}`;
  async get<T extends object | null>(service: string): Promise<IApiResponse<T>> {
    const response: IApiResponse<T> = {
      result: 'success',
    }
    
    try {
      const apiResponse = (await $fetch(`${this.apiUrl}${service}`)) as ILLApiResponseRaw
      
      response.data = apiResponse.data as T;
    } catch (error: any) {
      console.log('error', error);
      
      let error_code = 500;
      if (error.response) {
        error_code = error.response.status
      }
      response.code = error_code;
      response.result = 'error';
    }

    return response;
  }
  /*response = {
      "result": 'success',
      'data': data,
    }

          if status_code not in positive_statuses:
  response['result'] = 'error'
  response['error_code'] = error_code
  response['error_message'] = error_message*/
}

export const apiFetcher = new LLApiFetcher();
