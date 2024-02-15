import { LLAdminApiFetcher } from "@ll-fetchers/llAdminApiFetcher";
import { IImageResponse } from "@ll-interfaces/IImageResponse";
import { useMultipartReader } from '../../../../utils/multipart';
import { storageHandler } from '../../../../utils/storage';
import { type MultiPartData } from 'h3';
import { randomUUID } from 'node:crypto';

export default defineEventHandler(async (event) => {
  const { node } = event;
  const id = getRouterParam(event, 'id') as string;
  const adminApiFetcher = new LLAdminApiFetcher(node)
  const body = await useMultipartReader(event);

  const saveFile = async (file: MultiPartData): Promise<string | null> => {
    const [_mime, ext] = String(file.type).split('/');
    const fileName = randomUUID() + '.' + ext;

    await storageHandler.setItemRaw(`/${body.code}/${fileName}`, file.data);

    return fileName;
  };

  const fileName = await saveFile(body.image)

  if (fileName) {
    const response = await adminApiFetcher.post<IImageResponse>(`profile/image/add`, {
      image_name: fileName,
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