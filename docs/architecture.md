# Архитектура

## Стек

- React 19 + TypeScript
- Vite
- MUI (`@mui/material`, `@mui/icons-material`)
- React Query (`@tanstack/react-query`)
- Axios
- React Hook Form + Zod
- Zustand

## Слои и структура

Проект организован по слоям, близко к FSD:

- `src/app` - инициализация приложения, роутинг, глобальные конфиги.
- `src/pages` - страничные entrypoint-компоненты.
- `src/widgets` - сборка экранов из feature/entity/shared.
- `src/features` - пользовательские сценарии и UI-логика.
- `src/entities` - доменные сущности, API и контракты данных.
- `src/shared` - общие утилиты, UI-компоненты, хуки, константы.

## Роутинг

Основные маршруты:

- `/sign-in`
- `/forgot`
- `/companies`
- `/users`
- `/devices`
- `/groups`
- `/meters`
- `/readings`
- `/webhooks`

`ProtectedRoute` ограничивает доступ к приватной части приложения по токену и роли.

## Роли и доступ

Роли:

- `super_admin`
- `admin`
- `user`
- `controller`

Навигация и доступ к разделам управляются через `SIDEBAR_LINKS` и role-check helpers.

## API и авторизация

- Базовый URL API берется из `VITE_API_URL`.
- Axios-интерсептор автоматически подставляет `Authorization: Bearer ...`.
- При `401` выполняется logout и очистка сессии.
- Сессия хранится в `localStorage` (ключ `turan_auth`) через Zustand.

## Данные и валидация

- Server state: React Query.
- Формы: React Hook Form.
- Валидация: Zod (и для форм, и для ответов API в `entities`).
