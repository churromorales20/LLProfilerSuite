import type { IUserInfo } from './IUserInfo';
interface IAuthToken {
  token: string;
  expires: Date;
  scope: string;
}

export interface ILoginResponse {
  auth_token: IAuthToken;
  user: IUserInfo;
}