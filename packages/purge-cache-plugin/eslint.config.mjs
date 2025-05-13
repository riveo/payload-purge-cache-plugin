import { eslintConfigNext } from '../../eslint.config.mjs';

const config = [
  {
    ignores: ['.next', 'dist', 'var'],
  },
  ...eslintConfigNext,
];

export default config;
