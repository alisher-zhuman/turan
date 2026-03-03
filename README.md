# Turan Frontend

Админ-панель Turan для управления компаниями, пользователями, устройствами, группами, счетчиками, показаниями и вебхуками.

## Быстрый старт

1. Установить зависимости:
   ```bash
   npm ci
   ```
2. Заполнить `.env`:
   ```bash
   VITE_API_URL="https://your-api-host/api/"
   ```
3. Запустить dev-сервер:
   ```bash
   npm run dev
   ```

## Основные скрипты

- `npm run dev` - локальная разработка
- `npm run lint` - проверка ESLint
- `npm run build` - TypeScript + production build
- `npm run preview` - локальный предпросмотр production-сборки

## Документация

- [Карта документации](docs/README.md)
- [Запуск и окружение](docs/getting-started.md)
- [Архитектура проекта](docs/architecture.md)
- [Конвенции разработки](docs/conventions.md)
