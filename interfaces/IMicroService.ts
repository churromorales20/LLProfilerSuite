export interface IMicroService {
  name: string;
  url: string;
  port?: number;
}

export enum MsRequestType {
  Post = 'POST',
  Get = 'GET',
}

export interface IMicroServiceRequest {
  service: string;
  end_point: string;
  type: MsRequestType;
  data?: Object;
}