import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const body = await readBody(event)
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.post<Object>(`auth/recover/confirm`, {
    code: body.code,
    password: body.password
  });

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})