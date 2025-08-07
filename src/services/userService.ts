import { prisma } from '@/lib/prisma';
import type { CreateUserData, TelegramUserData, User } from '@/types/user';

export class UserService {
  /**
   * Создает нового пользователя или обновляет существующего
   */
  static async upsertUser(telegramData: TelegramUserData): Promise<User> {
    const { id, ...userData } = telegramData;
    
    return await prisma.user.upsert({
      where: { telegramId: BigInt(id) },
      update: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        languageCode: userData.language_code,
        isPremium: userData.is_premium || false,
        addedToAttachmentMenu: userData.added_to_attachment_menu || false,
        allowsWriteToPm: userData.allows_write_to_pm || false,
        photoUrl: userData.photo_url,
        lastSeen: new Date(),
      },
      create: {
        telegramId: BigInt(id),
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        languageCode: userData.language_code,
        isPremium: userData.is_premium || false,
        addedToAttachmentMenu: userData.added_to_attachment_menu || false,
        allowsWriteToPm: userData.allows_write_to_pm || false,
        photoUrl: userData.photo_url,
      },
    });
  }

  /**
   * Находит пользователя по Telegram ID
   */
  static async findByTelegramId(telegramId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });
  }

  /**
   * Находит пользователя по ID
   */
  static async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Обновляет роль пользователя
   */
  static async updateRole(id: number, role: 'USER' | 'ADMIN'): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  /**
   * Получает всех пользователей
   */
  static async findAll(): Promise<User[]> {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Получает активных пользователей
   */
  static async findActive(): Promise<User[]> {
    return await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { lastSeen: 'desc' },
    });
  }

  /**
   * Деактивирует пользователя
   */
  static async deactivate(id: number): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Активирует пользователя
   */
  static async activate(id: number): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }
}
