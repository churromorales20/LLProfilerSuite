import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IMemorialWithUI } from "@ll-interfaces/IMemorial";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.get<IMemorialWithUI>(`profile/${id}/edit`);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})