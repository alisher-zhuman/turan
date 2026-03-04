# Turan Frontend

Turan admin panel for managing companies, users, devices, groups, meters, readings, and webhooks.

## Quick Start

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Create `.env` from the example file:
   ```bash
   cp .env.example .env
   ```
3. Configure `.env`:
   ```bash
   VITE_API_URL="https://your-api-host/api/"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Main Scripts

- `npm run dev` - local development
- `npm run lint` - ESLint check
- `npm run build` - TypeScript + production build
- `npm run preview` - local preview of the production build

## Documentation

- [Documentation Map](docs/README.md)
- [Getting Started & Environment](docs/getting-started.md)
- [Project Architecture](docs/architecture.md)
- [Development Conventions](docs/conventions.md)
