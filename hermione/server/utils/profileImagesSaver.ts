import { storageHandler } from './storage';
import { type MultiPartData } from 'h3';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { IImageSaverParams } from "@ll-interfaces/IImageSaverParams";

export class LLProfileImagesSaver {
  async resizeAndSave({ image, profile_code: profileCode, height, width }: IImageSaverParams): Promise<string | null> {
    try {
      const [_mime, ext] = String(image.type).split('/');
      const fileName = randomUUID() + '.webp';

      const dataImage = await sharp(image.data)
        .webp()
        .resize({
          height: height,
          width: width,
          withoutEnlargement: true
        })
        .toBuffer();

      await storageHandler.setItemRaw(`/${profileCode}/${fileName}`, dataImage);

      return fileName;
    } catch (error) {
      console.log('Error saving file.');
      
      return null;
    }
  }
}

export const profileImage = new LLProfileImagesSaver();
