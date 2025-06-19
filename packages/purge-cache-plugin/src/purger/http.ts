import type { PurgerAction } from '../types.js';

export const getHttpPurgerAction = (
  endpoint: RequestInfo,
  options?: RequestInit,
): PurgerAction<number> => {
  return async () => {
    'use server';

    try {
      const response = await fetch(endpoint, options);

      if (response.status >= 400) {
        return { error: response.status };
      }

      return {};
    } catch (e) {
      console.error(e);
      return { error: 500 };
    }
  };
};
