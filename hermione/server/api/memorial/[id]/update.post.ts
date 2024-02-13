import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const body = await readBody(event);
  const adminApiFetcher = new LLAdminApiFetcher(node)
  
  const response = await adminApiFetcher.post<Object>(`profile/update`, {
    profile_id: id,
    field_name: body.attr,
    field_value: body.value,
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})