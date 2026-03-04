# Architecture

## Stack

- React 19 + TypeScript
- Vite
- MUI (`@mui/material`, `@mui/icons-material`)
- React Query (`@tanstack/react-query`)
- Axios
- React Hook Form + Zod
- Zustand

## Layers and Structure

The project is organized in layers, inspired by FSD:

- `src/app` - app bootstrap, routing, global configs.
- `src/pages` - page entrypoint components.
- `src/widgets` - screen composition from feature/entity/shared layers.
- `src/features` - user scenarios and UI logic.
- `src/entities` - domain entities, API, and data contracts.
- `src/shared` - shared utilities, UI components, hooks, constants.

## Routing

Main routes:

- `/log-in`
- `/forgot-password`
- `/companies`
- `/users`
- `/devices`
- `/groups`
- `/meters`
- `/readings`
- `/webhooks`

`ProtectedRoute` limits access to the private app area based on token and role.

## Roles and Access

Roles:

- `super_admin`
- `admin`
- `user`
- `controller`

Navigation and section access are controlled via `SIDEBAR_LINKS` and role-check helpers.

## API and Authorization

- The API base URL is provided via `VITE_API_URL`.
- Axios interceptor automatically adds `Authorization: Bearer ...`.
- On `401`, the app performs logout and clears the session.
- Session is stored in `localStorage` (`turan_auth`) via Zustand.

## Data and Validation

- Server state: React Query.
- Forms: React Hook Form.
- Validation: Zod (for forms and API responses in `entities`).
