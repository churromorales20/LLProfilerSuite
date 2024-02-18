import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { ICondolenceEntry } from "@ll-interfaces/ICondolenceEntry";
import { IPageInfo } from "@ll-interfaces/IPageInfo";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const query = getQuery(event)
  const adminApiFetcher = new LLAdminApiFetcher(node);
  const urlService = `profile/${id}/wall?status=${query.status}${query.last_date ? `&last_date=${query.last_date}` : ''}`;

  const response = await adminApiFetcher.get<IPageInfo<ICondolenceEntry>>(urlService);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})