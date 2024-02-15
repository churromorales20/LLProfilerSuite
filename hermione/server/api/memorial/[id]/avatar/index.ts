import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IImageResponse } from "@ll-interfaces/IImageResponse";
import { useMultipartReader } from '../../../../utils/multipart';
import { storageHandler } from '../../../../utils/storage';
import { profileImage } from '../../../../utils/profileImagesSaver';

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await useMultipartReader(event);

  const fileName = await profileImage.resizeAndSave({
    image: body.avatar,
    profile_code: body.code,
    height: 700
  })

  if (fileName) {
    const response = await adminApiFetcher.post<IImageResponse>(`profile/avatar`, {
      avatar: fileName,
      profile_id: id
    });

    if (response.code) {
      node.res.statusCode = response.code!;
      storageHandler.removeItem(fileName)
    }

    node.res.end(JSON.stringify(response));
  }

  node.res.end(JSON.stringify({
    code: 500,
  }));
})