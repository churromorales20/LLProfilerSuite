import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await readBody(event)

  console.log('PAOOO', body.index);
  

  const response = await adminApiFetcher.post<Object>(`profile/video/delete`, {
    video_index: body.index,
    profile_id: id
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})