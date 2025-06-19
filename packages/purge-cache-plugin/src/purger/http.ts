import type { PurgerAction } from '../types.js';

export const getHttpPurgerAction = (
  endpoint: RequestInfo,
  options?: RequestInit,
): PurgerAction => {
  return async () => {
    'use server';

    try {
      const response = await fetch(endpoint, options);

      if (response.status >= 400) {
        return { error: `${response.status} ${await response.text()}` };
      }

      return {};
    } catch (e) {
      console.error(e);
      return { error: '500' };
    }
  };
};
