# Getting Started and Environment

## Requirements

- Node.js 20+
- npm 10+

## Local Run

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Create `.env` from the example:
   ```bash
   cp .env.example .env
   ```
3. Make sure API URL is set in `.env`:
   ```bash
   VITE_API_URL="https://your-api-host/api/"
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

By default, Vite serves the frontend at `http://localhost:5173`.
If the port is already occupied, Vite automatically picks the next available port.

## Environment Validation

- The app validates `import.meta.env` during startup.
- `VITE_API_URL` is required.
- If it is missing or empty, the app fails immediately with a configuration error instead of running in a broken state.

## Useful Commands

- Run linter:
  ```bash
  npm run lint
  ```
- Production build:
  ```bash
  npm run build
  ```
- Local production preview:
  ```bash
  npm run preview
  ```

## Dev vs Build

- `npm run dev` starts the Vite development server with fast module serving and HMR.
- `npm run build` runs TypeScript build checks and creates the production bundle.
- Vendor chunk splitting from `vite.config.ts` is applied in the production build only.

## Docker

The project includes `Dockerfile` and `docker-compose.yml`.

Run:

```bash
docker compose up --build
```

With the current configuration, the container is available at `http://localhost:80`.

## Git hooks

Husky is used:

- `pre-push` runs `npm run lint`.

If linting fails, push is blocked.
