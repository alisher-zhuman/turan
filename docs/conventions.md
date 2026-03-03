# Конвенции разработки

## Куда класть код

- `entities`:
  - API-запросы к конкретной сущности
  - типы и схемы ответов API
- `features`:
  - пользовательский сценарий (hooks/forms/actions)
  - UI-логика конкретного use case
- `widgets`:
  - компоновка нескольких features в экранный блок
- `shared`:
  - переиспользуемые универсальные вещи

Пример: `useForgotForm` остается в `features/authentication`, потому что это сценарий формы, а не доменная сущность.

## Импорты

Порядок импортов зафиксирован через ESLint (`simple-import-sort`):

1. React (`react`, `react-dom`)
2. Router (`react-router`)
3. Прочие внешние библиотеки
4. UI-библиотеки (`@mui`, `@emotion`)
5. Локальные алиасы слоями:
   - `pages`
   - `widgets`
   - `features`
   - `entities`
   - `shared`
6. Прочие `@/`
7. Относительные импорты (`../`, `./`)

## Линтинг

- Запуск: `npm run lint`
- Автоисправление: `npm run lint -- --fix`
- Перед `git push` автоматически срабатывает Husky `pre-push` с `npm run lint`.

## Алиасы

Поддерживаемые алиасы:

- `@/*`
- `@pages/*`
- `@widgets/*`
- `@features/*`
- `@entities/*`
- `@shared/*`
