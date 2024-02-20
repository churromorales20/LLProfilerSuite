import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IUserInfo } from "@ll-interfaces/IUserInfo";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const adminApiFetcher = new LLAdminApiFetcher(node)

  const response = await adminApiFetcher.get<IUserInfo>(`auth/user/info`)

  if (response.code) {
    node.res.statusCode = response.code!;
  }

  node.res.end(JSON.stringify(response));
})