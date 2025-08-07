import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { validateTelegramUser, normalizeTelegramUser } from '@/utils/telegramValidation';

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json();

    // Валидация данных
    if (!validateTelegramUser(rawData)) {
      return NextResponse.json(
        { error: 'Invalid Telegram user data' },
        { status: 400 }
      );
    }

    // Нормализация данных
    const telegramData = normalizeTelegramUser(rawData);

    // Синхронизация пользователя
    const user = await UserService.upsertUser(telegramData);

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
