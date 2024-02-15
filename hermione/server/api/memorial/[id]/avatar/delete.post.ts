import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { storageHandler } from '../../../../utils/storage';

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await readBody(event)

  const response = await adminApiFetcher.post<Object>(`profile/avatar/delete`, {
    profile_id: id
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  } else {
    storageHandler.removeItem(`${body.code}/${body.current_avatar}`)
  }

  node.res.end(JSON.stringify(response));
})