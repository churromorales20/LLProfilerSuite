import type { IApiResponse } from "./IApiResponses";

export interface ILLApiError<T extends object | null> extends Error {
  response?: IApiResponse<T>;
}

{
  background: 'bg-llblue-300',
}