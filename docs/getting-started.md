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
