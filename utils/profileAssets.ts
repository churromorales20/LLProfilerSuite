import fs from 'node:fs'
import { sendStream } from 'h3'
import { storageHandler } from './storageHandler'
export default defineEventHandler(async (event) => {
  const assetname = getRouterParam(event, 'assetname') as string;
  const directory = getRouterParam(event, 'directory') as string;

  const image = await storageHandler.getItem(`${directory}/${assetname}`);

  if (!image) {
    return {
      statusCode: 404,
      body: 'IMage not found'
    };
  }

  return sendStream(event, fs.createReadStream(`${process.env.PROFILES_ASSETS_DIR}/${directory}/${assetname}`))
});
