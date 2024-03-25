export interface IUserInfo {
  last_name: string;
  first_name?: string;
  email?: string;
  phrase? : string;
  extra_info?: IUserExtraInfo;
}

export interface IUserExtraInfo {
  tour_count?: number;
}

export enum UserInfoFields {
  LastName = 'last_name',
  FirstName = 'first_name',
  Email = 'email'
}