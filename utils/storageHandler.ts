
import { createStorage } from 'unstorage';
import fsLiteDriver from 'unstorage/drivers/fs-lite';

export const storageHandler = createStorage({
  driver: fsLiteDriver({ base: process.env.PROFILES_ASSETS_DIR ? process.env.PROFILES_ASSETS_DIR : '../resources' })
});