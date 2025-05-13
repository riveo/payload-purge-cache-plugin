// eslint-disable-next-line import/no-extraneous-dependencies
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config([
  {
    ignores: ['var/*', 'dist/*', '.idea/*'],
  },
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ...importConfigs.recommended, plugins: {} },
  importConfigs.typescript,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
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
  {
    rules: {
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      'import/named': 0,
      'import/namespace': 0,
      'import/default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': 0,
      'import/prefer-default-export': 0,

      'import/no-commonjs': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.test.ts', 'tests/**/*.ts', '*.config.mjs'],
        },
      ],
      'import/no-cycle': ['error'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'class-methods-use-this': 0,
    },
  },
  {
    rules: {
      '@next/next/no-html-link-for-pages': 0,
    },
  },
]);
