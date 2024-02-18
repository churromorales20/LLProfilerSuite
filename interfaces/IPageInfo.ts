export interface IPageInfo<T extends object | null = null> {
  total_items: number;
  current_page: number;
  records_per_page: number;
  items: T[];
}