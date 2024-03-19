import { MsRequestType } from '../interfaces/IMicroService';
import type { IMicroService, IMicroServiceRequest } from '../interfaces/IMicroService';
import type { IApiResponse } from "../interfaces/IApiResponses";

const microServicesMap: IMicroService[] = [
  {
    name: 'social_image',
    url: `${process.env.LL_MS_SOCIAL_IMAGE}`,
    port: 9001
  }
];

class MSFetcher {
  private services: IMicroService[] = microServicesMap;

  async call<T extends object | null>(request: IMicroServiceRequest): Promise<T | null> {
    const service = this.getService(request.service);
    const serviceUrl = `${service.url}${service.port ? `:${service.port}` : ''}`;
    
    return this._fetch<T>(`${serviceUrl}/${request.end_point}`, request.type, request.data);
  }

  private getService(name: string): IMicroService {
    const service = this.services.find((service) => service.name === name);

    if (service === undefined) {
      throw new Error(`Invalid service: ${service}`);
    }
    
    return service;
  }

  private async _fetch<T extends object | null>(serviceUrl: string, type: MsRequestType, data: Object = {}): Promise<T | null> {
   
    try {
      const apiResponse = await (
        $fetch(`${serviceUrl}`, {
          method: type,
          body: type !== MsRequestType.Get ? data : null,
          async onResponseError({ request, response, options }) {
            throw new Error(`Error calling service: ${serviceUrl} ${JSON.stringify(data)}`);
          },
        })
      ) as IApiResponse;
        
      return apiResponse.data as T;

    } catch (error: any) {
      console.log('error', error);
      return null;
    }
  }
}

export const msFetcher = new MSFetcher();