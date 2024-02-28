import { apiFetcher } from "@ll-fetchers/llApiFetcher";
import { ICondolenceEntry } from "@ll-interfaces/ICondolenceEntry";
import { IPageInfo } from "@ll-interfaces/IPageInfo";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const query = getQuery(event)
  const code = getRouterParam(event, 'identifier');
  apiFetcher.loadAuthCookie = false;
  const response = await apiFetcher.get<IPageInfo<ICondolenceEntry>>(`profile/${code}/condolences?${query.last_date ? `&last_date=${query.last_date}` : ''}`)

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})