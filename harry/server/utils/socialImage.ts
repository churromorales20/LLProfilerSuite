import { Client } from "memjs";
import { msFetcher } from "@ll-fetchers/llMsFetcher";
import { MsRequestType } from "@ll-interfaces/IMicroService";
import { storageHandler } from '@ll-utils/storageHandler'

export class SocialImageHandler {

  private profileIdentifier: string;
  private profileAvatar: string;
  private profileHeader: string;
  private memcacheClient: Client;

  constructor(profileIdentifier: string, header: string, avatar: string) {
    this.profileIdentifier = profileIdentifier;
    this.profileAvatar = avatar;
    this.profileHeader = header;
    this.memcacheClient = Client.create();
  }

  async validateOrCreate(socialImageExists: boolean) {
    const cacheKey = `_profile_sossscssssial_image_${this.profileIdentifier}_`;
    const existsCache = await this.existsImageCache(cacheKey);
    //const socialImageExists = await storageHandler.getItem(socialImage);
    console.log(existsCache, socialImageExists);
    
    if (!existsCache || !socialImageExists) {
      const processedImage = await this.getImageFromService();

      if (processedImage === null) {
        throw new Error(`Error processing image: ${this.profileIdentifier}`);
      }

      this.saveCacheTag(cacheKey);
    }
  }

  private async saveCacheTag(key: string){
    await this.memcacheClient.set(key, 'SAVED', { expires: 1728000 });
  }

  private async getImageFromService(): Promise<Buffer| null> {
    const imageBuffer = await msFetcher.call<Buffer>({
      service: 'social_image',
      type: MsRequestType.Post,
      end_point: 'images/combine',
      data: {
        profile: this.profileIdentifier,
        image_1: this.profileHeader,
        image_2: this.profileAvatar,
      }
    });

    return imageBuffer;
  }
  
  private async existsImageCache(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.memcacheClient.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          if (value) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
  
}