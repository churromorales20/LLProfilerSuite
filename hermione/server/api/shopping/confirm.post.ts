import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IShoppingRequest } from "@ll-interfaces/IShoppingRequest";
import { LLShoppingManager } from "~/server/utils/shopping_manager";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event);
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const shoppingManager = new LLShoppingManager();

  const response = await adminApiFetcher.post<Object>(`shopping/confirm`, {
    ...body,
    order: shoppingManager.serializeRequest(body.items as unknown as IShoppingRequest),
    ip_address: getRequestHeader(event, 'x-forwarded-for'),
    language: node.req?.headers['accept-language']!.substring(0, 2).toUpperCase(),
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})