//import { IProfileResponse } from "@ll-interfaces/ProfileResponse";
import { apiFetcher } from "@ll-fetchers/llApiFetcher";
import { ILoginResponse } from "@ll-interfaces/ILoginResponse";
import { llCookie } from "@ll-utils/llCookie";


//import { useDayjs } from '#dayjs'

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const code = getRouterParam(event, 'identifier');
  apiFetcher.loadAuthCookie = false;
  
  const response = await apiFetcher.post<ILoginResponse>(`profile/${code}/condolences/`, {
    profile_id: code,
    message_text: body.entry_text,
    user_last_name: body.last_name,
    user_first_name: body.first_name,
    user_email: body.email,
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})