import type { TelegramUserData } from '@/types/user';

/**
 * Валидирует данные пользователя от Telegram
 */
export function validateTelegramUser(data: any): data is TelegramUserData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  // Проверяем обязательное поле id
  if (typeof data.id !== 'number' || data.id <= 0) {
    return false;
  }

  // Проверяем опциональные поля
  if (data.first_name !== undefined && typeof data.first_name !== 'string') {
    return false;
  }

  if (data.last_name !== undefined && typeof data.last_name !== 'string') {
    return false;
  }

  if (data.username !== undefined && typeof data.username !== 'string') {
    return false;
  }

  if (data.language_code !== undefined && typeof data.language_code !== 'string') {
    return false;
  }

  if (data.is_premium !== undefined && typeof data.is_premium !== 'boolean') {
    return false;
  }

  if (data.added_to_attachment_menu !== undefined && typeof data.added_to_attachment_menu !== 'boolean') {
    return false;
  }

  if (data.allows_write_to_pm !== undefined && typeof data.allows_write_to_pm !== 'boolean') {
    return false;
  }

  if (data.photo_url !== undefined && typeof data.photo_url !== 'string') {
    return false;
  }

  return true;
}

/**
 * Нормализует данные пользователя от Telegram
 */
export function normalizeTelegramUser(data: any): TelegramUserData {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    language_code: data.language_code,
    is_premium: data.is_premium || false,
    added_to_attachment_menu: data.added_to_attachment_menu || false,
    allows_write_to_pm: data.allows_write_to_pm || false,
    photo_url: data.photo_url,
  };
}
