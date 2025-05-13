import { type Plugin } from 'payload';
import {
  type PurgeCachePluginConfig,
  type PurgeCachePluginServerProps,
} from './types.js';

const DEFAULT_PATH = '/riveo-purge-cache';

const purgeCachePlugin = (pluginConfig: PurgeCachePluginConfig): Plugin => {
  return (incomingConfig) => {
    if (
      pluginConfig?.enabled === false ||
      pluginConfig.purgers.length === 0 ||
      !incomingConfig.admin
    ) {
      return incomingConfig;
    }

    const path = (pluginConfig?.path ?? DEFAULT_PATH).replace(/^\/{2,}/, '/');
    const serverProps: PurgeCachePluginServerProps = {
      purgeCachePlugin: {
        purgers: pluginConfig.purgers,
        path,
        access: pluginConfig.access,
      },
    };

    return {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
        components: {
          ...(incomingConfig.admin?.components ?? {}),
          afterNavLinks: [
            ...(incomingConfig.admin?.components?.afterNavLinks ?? []),
            {
              path: '@riveo/payload-purge-cache-plugin/components#AfterNavLinks',
              serverProps,
            },
          ],
          views: {
            ...(incomingConfig.admin?.components?.views ?? {}),
            riveoPurgeCache: {
              Component: {
                path: '@riveo/payload-purge-cache-plugin/components#PurgeCache',
                serverProps,
              },
              path,
              exact: true,
            },
          },
        },
      },
    };
  };
};

export default purgeCachePlugin;
