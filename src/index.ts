import purgeCachePlugin from './plugin';

export default purgeCachePlugin;

export { type PurgeCachePluginConfig, type Purger, type PurgerAction } from './types'

export { getCloudflarePurgerAction } from './purger/cloudflare';
export { getNextjsPurgerAction } from './purger/nextjs';
export { getHttpPurgerAction } from './purger/http';
