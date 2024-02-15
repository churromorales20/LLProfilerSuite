
import { createStorage } from 'unstorage';
import fsLiteDriver from 'unstorage/drivers/fs-lite';

export const storageHandler = createStorage({
  driver: fsLiteDriver({ base: './resources' })
});