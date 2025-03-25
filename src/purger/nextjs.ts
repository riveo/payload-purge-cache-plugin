import { revalidatePath } from 'next/cache';
import { type PurgerAction } from '../types';

export const getNextjsPurgerAction = (basePath = '/'): PurgerAction<void> => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async () => {
    'use server';
    revalidatePath(basePath, 'layout');

    return {};
  };
};
