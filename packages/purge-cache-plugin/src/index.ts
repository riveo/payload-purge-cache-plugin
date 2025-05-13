import purgeCachePlugin from './plugin.js';

export default purgeCachePlugin;

export {
  type PurgeCachePluginConfig,
  type Purger,
  type PurgerAction,
} from './types.js';

export { getCloudflarePurgerAction } from './purger/cloudflare.js';
export { getNextjsPurgerAction } from './purger/nextjs.js';
export { getHttpPurgerAction } from './purger/http.js';
