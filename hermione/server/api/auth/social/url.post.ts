//import { IProfileResponse } from "@ll-interfaces/ProfileResponse";
import { adminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)

  const response = await adminApiFetcher.get<Object>(`auth/social/${body.type}/url`);

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})