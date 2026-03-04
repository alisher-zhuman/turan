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

Example: `useForgotForm` stays in `features/authentication` because it is a form scenario, not a domain entity.

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
