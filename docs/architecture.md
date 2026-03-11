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

## App Bootstrap

The root app startup in `src/app/main.tsx` composes the main providers in this order:

- `ThemeProvider`
- `CssBaseline`
- `AppErrorBoundary`
- `QueryClientProvider`
- `Toaster`
- `RouterProvider`

Environment validation is triggered before the app renders via `@/shared/config/env`.

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

Routing uses `createBrowserRouter`, lazy page loading, and `WithSuspense` for route-level loading states.

`ProtectedRoute` limits access to the private app area based on token and role.

## Error Handling

The app uses two levels of UI error handling:

- `AppErrorBoundary` in `src/app/main.tsx` catches render/lifecycle crashes in the app tree.
- `errorElement` via `RouteErrorBoundary` catches route-level errors from React Router and replaces the default router error screen.

The shared fallback UI:

- shows a user-friendly error screen,
- allows page reload,
- allows navigation back to the app root,
- shows error details only in development mode.

Important limitation:

- Error boundaries do not replace normal API error handling.
- They are for React render/lifecycle crashes, not for regular `400/404/500` request states or event-handler errors.

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

## Build and Bundling

Production bundling is configured in `vite.config.ts`.

The build splits vendor code into dedicated chunks such as:

- React
- MUI
- Router
- React Query
- form stack (`react-hook-form`, resolvers, `zod`)
- Axios

This chunk split affects the production build only and is intended to improve cacheability and bundle organization.
