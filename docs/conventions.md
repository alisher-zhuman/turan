# Development Conventions

## Where to Place Code

- `entities`:
  - API requests for a specific entity
  - API response types and schemas
- `features`:
  - user scenario logic (hooks/forms/actions)
  - UI logic for a specific use case
- `widgets`:
  - composition of multiple features into a screen block
- `shared`:
  - reusable generic building blocks

Example: `useForgotPasswordForm` stays in `features/authentication` because it is a form scenario, not a domain entity.

Do not move code into `shared` just because it is small. Move it there only if it is truly generic and reusable across domains/screens.

## Imports

Import order is enforced by ESLint (`simple-import-sort`):

1. React (`react`, `react-dom`)
2. Router (`react-router`)
3. Other external libraries
4. UI libraries (`@mui`, `@emotion`)
5. Local aliases by layers:
   - `pages`
   - `widgets`
   - `features`
   - `entities`
   - `shared`
6. Other `@/` imports
7. Relative imports (`../`, `./`)

Inside the same layer/module, prefer relative imports over alias self-imports.

Examples:

- good: `../../helpers/route-error`
- bad: `@/app/router/helpers/route-error` from inside `src/app/...`

## Public API

- `index.ts` is a public API file only. It should not contain runtime logic (constants/functions/etc.).
- If a folder has both implementation and re-exports, move implementation to `base.ts` (or another named file) and re-export it from `index.ts`.
- In root feature barrels (`src/features/<feature>/index.ts`), use explicit exports (`export { ... }`, `export type { ... }`) to keep the external contract clear.
- In internal subfolder barrels (`constants/index.ts`, `helpers/index.ts`, `types/index.ts`), `export * from ...` is allowed.

## Folder Naming

- Prefer meaningful folders such as `helpers`, `constants`, `types`, `hooks`, `schemas`.
- Avoid vague folders like `utils` when the intent can be named more precisely.

## Linting

- Run: `npm run lint`
- Auto-fix: `npm run lint -- --fix`
- Before `git push`, Husky `pre-push` runs `npm run lint` automatically.

## Aliases

Supported aliases:

- `@/*`
- `@pages/*`
- `@widgets/*`
- `@features/*`
- `@entities/*`
- `@shared/*`

## Error Handling

- Use regular UI states or toasts for API/request errors.
- Use error boundaries for unexpected render/lifecycle crashes.
- If routing uses React Router data APIs, provide `errorElement` so the app does not fall back to the default router error screen.
