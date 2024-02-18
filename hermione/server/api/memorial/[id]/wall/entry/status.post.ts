import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const body = await readBody(event);
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.post<Object>(`profile/wall/post/status`, {
    profile_id: id,
    new_status: body.new_status,
    entry_id: body.entry_id,
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})