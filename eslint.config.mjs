import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { flatConfigs as importConfigs } from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const importConfig = tseslint.config(
  importConfigs.recommended,
  importConfigs.typescript,
  {
    rules: {
      // https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      "import/named": 0,
      "import/namespace": 0,
      "import/default": 0,
      "import/no-named-as-default-member": 0,
      "import/no-unresolved": 0,
      "import/prefer-default-export": 0,

      "import/no-commonjs": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.ts", "tests/**/*.ts", "*.config.mjs"],
        },
      ],
      "import/no-cycle": ["error"],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
    },
  },
);

const tsEslintConfig = tseslint.config(
  {
    extends: [tseslint.configs.recommended, tseslint.configs.stylistic],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/consistent-type-definitions": 0,
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["./eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

const customConfig = {
  rules: {
    "no-console": ["error", { allow: ["error", "warn", "info"] }],
    "class-methods-use-this": 0,
    "@next/next/no-html-link-for-pages": 0,
  },
};

export const eslintConfigBase = tseslint.config(
  {
    ignores: ["var/*"],
  },
  eslint.configs.recommended,
  importConfig,
  tsEslintConfig,
  eslintConfigPrettier,
  customConfig,
);

export const eslintConfigNext = tseslint.config(
  {
    ignores: ["var/*"],
  },
  compat.extends("next/core-web-vitals"),
  eslint.configs.recommended,
  importConfig.map((config) => {
    if (!!config.plugins && "import" in config.plugins) {
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
  eslintConfigPrettier,
  customConfig,
);

export default tseslint.config(
  {
    ignores: ["packages/*"],
  },
  eslintConfigBase,
);
