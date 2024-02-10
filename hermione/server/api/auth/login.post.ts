//import { IProfileResponse } from "@ll-interfaces/ProfileResponse";
import { adminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { ILoginResponse } from "@ll-interfaces/ILoginResponse";
//import { useDayjs } from '#dayjs'

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  
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
    //const currentDate = new Date();
    //const secondsRemaining = Math.floor((futureDate.getTime() - (new Date()).getTime()) / 1000);
    
    //node.res.setHeader('Set-Cookie', `LL_FRAMEWORK_INFO=${JSON.stringify(response.data)}; Path=/; Max-Age=${secondsRemaining}; HttpOnly; Secure; SameSite=Strict`);
    node.res.setHeader('Set-Cookie', `LL_FRAMEWORK_INFO=${JSON.stringify(response.data)}; Path=/; Max-Age=${secondsRemaining}; SameSite=Strict`);
  }

  node.res.end(JSON.stringify(response));
})