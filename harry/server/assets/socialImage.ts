import fs from 'node:fs'
import { SocialImageHandler } from "@/server/utils/socialImage";
import { storageHandler } from '@ll-utils/storageHandler'

export default defineEventHandler(async (event) => {
  const { node } = event;
  const profile = getRouterParam(event, 'profile') as string;
  const header = getRouterParam(event, 'header') as string;
  const avatar = getRouterParam(event, 'avatar') as string;
  const imageHandler = new SocialImageHandler(profile, header, avatar);

  try {
    const socialImage = `${profile}/social_image.webp`;
    const imageExists = await storageHandler.getItem(socialImage);
    await imageHandler.validateOrCreate(imageExists !== null);
    const image = await storageHandler.getItem(socialImage);

    if (!image) {
      return {
        statusCode: 404,
        body: 'Image not found'
      };
    }

    return sendStream(event, fs.createReadStream(`${process.env.PROFILES_ASSETS_DIR}/${socialImage}`))
  } catch (error: any) {
    return {
      statusCode: 404,
      body: 'Image not found'
    };
  }
})