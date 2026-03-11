import fs from "node:fs";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

const ALIAS_ROOTS = new Set([
  "shared",
  "features",
  "entities",
  "widgets",
  "pages",
]);

const getModuleDirs = (root) =>
  fs
    .readdirSync(new URL(`./src/${root}/`, import.meta.url), {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${root}/${entry.name}`);

const SELF_IMPORT_MODULES = [
  ...getModuleDirs("app"),
  ...getModuleDirs("shared"),
  ...getModuleDirs("entities"),
  ...getModuleDirs("features"),
  ...getModuleDirs("widgets"),
  ...getModuleDirs("pages"),
];

const createSelfImportRule = (modulePath) => {
  const [root, slice] = modulePath.split("/");
  const patterns = [`@/${modulePath}`, `@/${modulePath}/*`];

  if (ALIAS_ROOTS.has(root)) {
    patterns.push(`@${root}/${slice}`, `@${root}/${slice}/*`);
  }

  return {
    files: [`src/${modulePath}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: patterns,
              message: `Use relative imports inside src/${modulePath}.`,
            },
          ],
        },
      ],
    },
  };
};

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React core
            ["^react$", "^react-dom(?:$|/)"],

            // Router
            ["^react-router(?:$|/)", "^react-router-dom(?:$|/)"],

            // Side-effect imports (e.g. global css/env bootstrap)
            ["^\\u0000"],

            // Third-party libs (excluding React/Router/UI and local aliases)
            [
              "^(?![./])(?!(react$|react/|react-dom$|react-dom/|react-router$|react-router/|react-router-dom$|react-router-dom/|@mui/|@emotion/|@/|@pages/|@widgets/|@features/|@entities/|@shared/)).",
            ],

            // External UI libs
            ["^@mui(?:$|/)", "^@emotion(?:$|/)"],

            // Local aliases by layers
            ["^@pages(?:/|$)", "^@/pages(?:/|$)"],
            ["^@widgets(?:/|$)", "^@/widgets(?:/|$)"],
            ["^@features(?:/|$)", "^@/features(?:/|$)"],
            ["^@entities(?:/|$)", "^@/entities(?:/|$)"],
            ["^@shared(?:/|$)", "^@/shared(?:/|$)"],

            // Other local aliases
            ["^@/"],

            // Relative imports
            ["^\\.\\.(?:/|$)"],
            ["^\\./"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  ...SELF_IMPORT_MODULES.map(createSelfImportRule),
]);
