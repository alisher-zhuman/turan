import fs from "node:fs";

const ALIAS_ROOTS = new Set([
  "shared",
  "features",
  "entities",
  "widgets",
  "pages",
]);

const ROOT_DIRS = ["app", "shared", "entities", "features", "widgets", "pages"];

const getModuleDirs = (root) =>
  fs
    .readdirSync(new URL(`../src/${root}/`, import.meta.url), {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${root}/${entry.name}`);

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

export const SELF_IMPORT_RULES = ROOT_DIRS.flatMap(getModuleDirs).map(
  createSelfImportRule,
);
