export interface IPageInfiniteInfo<T extends object | null = null> {
  total_items: number;
  items: T[];
}