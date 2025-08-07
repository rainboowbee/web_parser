import { User as PrismaUser, UserRole } from '@prisma/client';

export type User = PrismaUser;

export type UserRole = UserRole;

export interface TelegramUserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface CreateUserData {
  telegramId: bigint;
  firstName?: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  photoUrl?: string;
  role?: UserRole;
}
