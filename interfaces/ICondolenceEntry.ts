export interface ICondolenceEntry {
  entry_id: string;
  user_info?: IWallUser;
  message_text: string;
  status: string;
  created_at: Date;
  user?: IWallUser;
}

interface IWallUser {
  last_name: string;
  first_name: string;
}

export enum EntryFormField {
  LastName = 'last_name',
  FirstName = 'first_name',
  Email = 'email',
  Entry = 'entry_text'
}