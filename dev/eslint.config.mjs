// @ts-check
import { eslintConfigNext } from '../eslint.config.mjs';

const config = [
  {
    ignores: ['.next', 'var/*', 'src/app/(payload)/*'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...eslintConfigNext,
  {
    files: ['./migrations/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 0,
    },
  },
];

export default config;
