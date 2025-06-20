import { revalidatePath } from 'next/cache.js';
import type { PurgerAction } from '../types.js';

export const getNextjsPurgerAction = (basePath = '/'): PurgerAction => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async () => {
    'use server';
    revalidatePath(basePath, 'layout');

    return {};
  };
};
