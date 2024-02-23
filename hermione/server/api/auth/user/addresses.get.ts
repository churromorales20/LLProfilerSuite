import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IShippingAddress } from "@ll-interfaces/IShippingAddress";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.get<IShippingAddress>(`auth/user/addresses`)

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})