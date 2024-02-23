import { llCookie } from "@ll-utils/llCookie";
import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { ISocialUrlResponse } from "@ll-interfaces/ISocialUrlResponse";
export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const type = body.type
  
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const lang = node.req?.headers['accept-language']!.substring(0, 2).toUpperCase();
  const ipAddress = getRequestHeader(event, 'x-forwarded-for')
  const response = await adminApiFetcher.post<ISocialUrlResponse>(`auth/social/${type}/url`,{
    language: lang,
    ip_address: ipAddress,
    is_popup: body.is_popup,
  });
  
  if (response.code) {
    node.res.statusCode = response.code!;
  } else if (type === 'facebook'){
    node.res.setHeader('Set-Cookie', llCookie.create('_FB_LOGIN_SIGN_', response.data!, 600));
  }

  node.res.end(JSON.stringify(response));
})