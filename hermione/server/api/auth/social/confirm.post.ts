//import { IProfileResponse } from "@ll-interfaces/ProfileResponse";
import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IApiResponse } from "@ll-interfaces/IApiResponses";
import { ILoginResponse } from "@ll-interfaces/ILoginResponse";
import { ISocialUrlResponse } from "@ll-interfaces/ISocialUrlResponse";
import { llCookie } from "@ll-utils/llCookie";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const adminApiFetcher = new LLAdminApiFetcher(node)

  let sign = '';
  let isValid = false;

  if (body.type === 'facebook') {
    const cookieData = llCookie.getCookieByName<ISocialUrlResponse>('_FB_LOGIN_SIGN_', node);
   
    if (cookieData) {
      sign = cookieData?.sign!;
      isValid = true;
    }
  } else {
    if (body?.sign) {
      sign = body?.sign;
      isValid = true;
    }
  }

  let response: IApiResponse<ILoginResponse> = {
    code: 401,
    result: 'error'
  }

  const getRemainingSeconds = (dateValue: string): number => {
    return Math.floor(((new Date(dateValue)).getTime() - (new Date()).getTime()) / 1000);
  }

  if (isValid) {
    response = await adminApiFetcher.post<ILoginResponse>(`auth/social/confirm/`, {
      sign
    });
  }

  if (response.code) {
    node.res.statusCode = response.code!;
  } else {
    const secondsRemaining = getRemainingSeconds(response.data?.auth_token.expires! as unknown as string);
    node.res.setHeader('Set-Cookie', llCookie.create('_LL_FRAMEWORK_INFO_', response.data!, secondsRemaining));
  }

  node.res.end(JSON.stringify(response));
})