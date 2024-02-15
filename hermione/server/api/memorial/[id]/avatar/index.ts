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

    try {
      await storageHandler.setItemRaw(`/${body.code}/${fileName}`, file.data);

      return fileName;
    } catch (error) {
      console.log('ERRRO UOAIDNG FILE');
      
      return null;
    }
  };

  const fileName = await saveFile(body.avatar)

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