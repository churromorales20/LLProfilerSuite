export interface IUserInfo {
  last_name: string;
  first_name?: string;
  email?: string;
  phrase? : string;
}

export enum UserInfoFields {
  LastName = 'last_name',
  FirstName = 'first_name',
  Email = 'email',
  Phrase = 'phrase'
}