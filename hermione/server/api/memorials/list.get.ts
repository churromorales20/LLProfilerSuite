import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IMemorial } from "@ll-interfaces/IMemorial";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.get<IMemorial[]>(`profiles/list`);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})