import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IImageResponse } from "@ll-interfaces/IImageResponse";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await readBody(event)
  console.log(body.video_id);
  
  const response = await adminApiFetcher.post<IImageResponse>(`profile/video/add`, {
    video_id: body.video_id,
    profile_id: id
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})