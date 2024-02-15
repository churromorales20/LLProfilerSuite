import fs from 'node:fs'
import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
  const assetname = getRouterParam(event, 'assetname') as string;
  const directory = getRouterParam(event, 'directory') as string;

  const image = await storageHandler.getItem(`${directory}/${assetname}`);

  if (!image) {
    return {
      statusCode: 404,
      body: 'Imagen no encontrada'
    };
  }

  return sendStream(event, fs.createReadStream(`./resources/${directory}/${assetname}`))
});
