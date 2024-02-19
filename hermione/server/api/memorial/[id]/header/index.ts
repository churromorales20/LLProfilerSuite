import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IImageResponse } from "@ll-interfaces/IImageResponse";
import { useMultipartReader } from '../../../../utils/multipart';
import { storageHandler } from '../../../../utils/storage';
import { type MultiPartData } from 'h3';
import { randomUUID } from 'node:crypto';
import { profileImage } from '../../../../utils/profileImagesSaver';

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await useMultipartReader(event);

  const fileName = await profileImage.resizeAndSave({
    image: body.header_image,
    profile_code: body.code,
    width: 1200
  })

  if (fileName) {
    const response = await adminApiFetcher.post<IImageResponse>(`profile/header`, {
      top_image: fileName,
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