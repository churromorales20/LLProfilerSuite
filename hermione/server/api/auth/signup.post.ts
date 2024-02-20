import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const lang = node.req?.headers['accept-language']!.substring(0, 2).toUpperCase();
  const ipAddress = getRequestHeader(event, 'x-forwarded-for')
  
  const response = await adminApiFetcher.post<Object>(`auth/signup`, {
    email: body.email,
    password: body.password,
    first_name: body.first_name,
    language: lang,
    ip_address: ipAddress,
    last_name: body.last_name,
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})