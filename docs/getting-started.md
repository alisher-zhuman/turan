# Запуск и окружение

## Требования

- Node.js 20+
- npm 10+

## Локальный запуск

1. Установить зависимости:
   ```bash
   npm ci
   ```
2. Убедиться, что в `.env` задан URL API:
   ```bash
   VITE_API_URL="https://your-api-host/api/"
   ```
3. Запустить приложение:
   ```bash
   npm run dev
   ```

По умолчанию Vite поднимает фронтенд на `http://localhost:5173`.

## Полезные команды

- Проверка линтера:
  ```bash
  npm run lint
  ```
- Production сборка:
  ```bash
  npm run build
  ```
- Локальный просмотр production:
  ```bash
  npm run preview
  ```

## Docker

В проекте есть `Dockerfile` и `docker-compose.yml`.

Запуск:

```bash
docker compose up --build
```

По текущей конфигурации контейнер доступен на `http://localhost:80`.

## Git hooks

Используется Husky:

- `pre-push` запускает `npm run lint`.

Если линтер не проходит, push будет остановлен.
