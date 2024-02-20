import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IMemorial } from "@ll-interfaces/IMemorial";

export default defineEventHandler(async (event) => {
  const { node } = event;

  console.log("node.req.headers['accept-language']");
  console.log("node.req.headers['accept-language']");
  console.log("node.req.headers['accept-language']");
  console.log(node.req.headers['accept-language']);
  
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.get<IMemorial>(`profile/${id}/edit`);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})