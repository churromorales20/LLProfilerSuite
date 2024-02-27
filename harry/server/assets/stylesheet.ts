import fs from 'fs';
import { Client } from "memjs";
import { cssProc } from "../utils/cssProfileProcessor";

export default defineEventHandler(async (event) => {
  const { node } = event;
  const uuid = getRouterParam(event, 'uuid') as string;
  //const memcached = new Memcached('127.0.0.1s:11211');
  const memcached = Client.create();
  const cacheKey = `_profiler_css_profilessaaas_${uuid}_`;
  const { value: cachedCssBuffer } = await memcached.get(cacheKey);
  let cachedCss = '';

  if (cachedCssBuffer === null) {
    cachedCss = await cssProc(uuid);
    console.log('cachedCss');
    console.log('cachedCss');
    console.log('cachedCss');
    console.log(cachedCss);
    
    await memcached.set(cacheKey, cachedCss, { expires: 10 });
  } else {
    cachedCss = cachedCssBuffer!.toString();
  }

  node.res.setHeader('Content-Type', 'text/css');
  node.res.end(cachedCss)
})