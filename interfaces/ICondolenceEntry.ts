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