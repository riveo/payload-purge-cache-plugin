import { type PurgerAction } from '../types.js';

type CloudflarePurgerFactoryOptions = {
  apiKey: string;
  zoneId: string;
  /**
   * List of hosts to purge
   */
  hosts?: string[];
  /**
   * List of cache tags to purge
   */
  tags?: string[];
  /**
   * List of prefixes to purge. A prefix has to include hostname but not scheme
   * e.g.: example.com/prefix
   */
  prefixes?: string[];
  /**
   * List of specific urls to purge. An url has to include scheme, hostname and path
   * e.g.: https://example.com/full/path
   */
  files?: string[];
};

export const getCloudflarePurgerAction = (
  options: CloudflarePurgerFactoryOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): PurgerAction<any> => {
  return async () => {
    'use server';
    if (!options.apiKey || !options.zoneId) {
      console.warn(
        'Cloudflare API token or zone ID is not set. Skipping cache purge.',
      );

      return {
        error: 'Invalid configuration',
      };
    }

    const endpoint = `https://api.cloudflare.com/client/v4/zones/${options.zoneId}/purge_cache`;

    const { hosts, tags, prefixes, files } = options;
    const isPurgeEverything = !hosts && !tags && !prefixes && !files;

    const purgeRequestBody = isPurgeEverything
      ? { purge_everything: true }
      : { hosts, tags, prefixes, files };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purgeRequestBody),
    });

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { error: await response.json() };
    }

    return {};
  };
};
