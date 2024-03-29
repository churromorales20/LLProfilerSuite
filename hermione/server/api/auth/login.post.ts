//import { IProfileResponse } from "@ll-interfaces/ProfileResponse";
import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { ILoginResponse } from "@ll-interfaces/ILoginResponse";
import { llCookie } from "@ll-utils/llCookie";


//import { useDayjs } from '#dayjs'

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.post<ILoginResponse>(`login`, {
    username: body.email,
    password: body.password
  });

  const getRemainingSeconds = (dateValue: string): number => {
    return Math.floor(((new Date(dateValue)).getTime() - (new Date()).getTime()) / 1000);
  }

  if (response.code) {
    node.res.statusCode = response.code!;
  } else {
    const secondsRemaining = getRemainingSeconds(response.data?.auth_token.expires! as unknown as string);
    node.res.setHeader('Set-Cookie', llCookie.create('_LL_FRAMEWORK_INFO_', response.data!, secondsRemaining));
  }

  node.res.end(JSON.stringify(response));
})