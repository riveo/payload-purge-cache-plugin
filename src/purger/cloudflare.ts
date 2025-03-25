import { type PurgerAction } from '../types';

export const getCloudflarePurgerAction = (options: {
  apiKey: string;
  zoneId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): PurgerAction<any> => {
  return async () => {
    'use server';
    if (!options.apiKey || !options.zoneId) {
      console.warn(
        'Cloudflare API token or zone ID is not set. Skipping cache purge.',
      );

      return {};
    }

    const endpoint = `https://api.cloudflare.com/client/v4/zones/${options.zoneId}/purge_cache`;

    const body = JSON.stringify({ purge_everything: true });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { error: await response.json() };
    }

    return {};
  };
};
