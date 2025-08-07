# Настройка базы данных

## Требования

- PostgreSQL 12 или выше
- Node.js 18 или выше

## Установка зависимостей

```bash
npm install
```

## Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/telegram_mini_app?schema=public"
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Замените `username`, `password`, `localhost`, `5432` и `telegram_mini_app` на ваши настройки PostgreSQL.

## Инициализация базы данных

1. **Генерация Prisma клиента:**
   ```bash
   npm run db:generate
   ```

2. **Создание таблиц в базе данных:**
   ```bash
   npm run db:push
   ```

   Или используйте миграции (рекомендуется для продакшена):
   ```bash
   npm run db:migrate
   ```

## Модель пользователя

Модель `User` включает следующие поля:

### Данные от Telegram:
- `telegramId` (BigInt) - ID пользователя в Telegram
- `firstName` (String?) - Имя пользователя
- `lastName` (String?) - Фамилия пользователя
- `username` (String?) - Username в Telegram
- `languageCode` (String?) - Код языка пользователя
- `isPremium` (Boolean) - Премиум статус
- `addedToAttachmentMenu` (Boolean) - Добавлен в меню вложений
- `allowsWriteToPm` (Boolean) - Разрешает писать в личные сообщения
- `photoUrl` (String?) - URL аватара

### Данные приложения:
- `role` (UserRole) - Роль пользователя (USER/ADMIN)
- `isActive` (Boolean) - Активен ли пользователь
- `lastSeen` (DateTime) - Последний визит
- `createdAt` (DateTime) - Дата создания
- `updatedAt` (DateTime) - Дата обновления

## Просмотр данных

Для просмотра данных в базе используйте Prisma Studio:

```bash
npm run db:studio
```

Это откроет веб-интерфейс на http://localhost:5555 для управления данными.

## API Endpoints

- `POST /api/users/sync` - Синхронизация пользователя с Telegram
- `GET /api/users/[id]` - Получение пользователя по ID
- `PATCH /api/users/[id]` - Обновление роли пользователя

## Использование в компонентах

```tsx
import { useUser } from '@/hooks/useUser';

function MyComponent() {
  const { user, loading, error } = useUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user</div>;
  
  return <div>Hello, {user.firstName}!</div>;
}
```
