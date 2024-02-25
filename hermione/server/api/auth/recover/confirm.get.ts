import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IShippingAddress } from "@ll-interfaces/IShippingAddress";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const query = getQuery(event)

  const response = await adminApiFetcher.get<Object>(`auth/recover/confirm?code=${query.code}`)

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})