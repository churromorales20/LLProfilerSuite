import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IOrder } from '@ll-interfaces/IOrder';
import { LLShoppingManager } from "~/server/utils/shopping_manager";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const query = getQuery(event)
  const adminApiFetcher = new LLAdminApiFetcher(node);
  const ipAddress = getRequestHeader(event, 'x-forwarded-for')

  const shoppingManager = new LLShoppingManager();
  const orderRequestString = shoppingManager.createRequestFromQuery(query.order ? query.order as string : '', ipAddress ? ipAddress : '172.0.0.1')
  

  const response = await adminApiFetcher.get<IOrder>(`shopping?order=${orderRequestString}`);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})
