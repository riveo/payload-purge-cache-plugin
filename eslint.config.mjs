import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const baseConfig = tseslint.config(
  {
    ignores: ['var/'],
  },
  js.configs.recommended,
);

const importConfig = tseslint.config(
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    rules: {
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      'import/named': 0,
      'import/namespace': 0,
      'import/default': 0,
      'import/no-named-as-default-member': 0,
      'import/no-unresolved': 0,
      'import/prefer-default-export': 0,

      'import/no-anonymous-default-export': 'error',

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
);

const tsEslintConfig = tseslint.config(
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      tseslint.configs.recommendedTypeCheckedOnly,
      tseslint.configs.stylisticTypeCheckedOnly,
    ],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
);

const customConfig = tseslint.config({
  rules: {
    'no-console': ['error', { allow: ['error', 'warn', 'info'] }],
    'class-methods-use-this': 0,
  },
});

export const eslintConfigBase = tseslint.config(
  baseConfig,
  importConfig,
  tsEslintConfig,
  prettierConfig,
  customConfig,
);

export const eslintConfigNext = tseslint.config(
  baseConfig,
  compat.extends('next/core-web-vitals'),
  importConfig.map((config) => {
    if (!!config.plugins && 'import' in config.plugins) {
      const plugins = { ...config.plugins };
      delete plugins.import;

      return {
        ...config,
        plugins,
      };
    }

    return config;
  }),
  tsEslintConfig,
  prettierConfig,
  customConfig,
);

export default tseslint.config(
  {
    ignores: ['packages/*'],
  },
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['*.config.mjs'],
      },
    },
  },
  eslintConfigBase,
);
