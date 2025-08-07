'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';
import { UserHeader } from '@/components/UserHeader/UserHeader';
import { useUser } from '@/hooks/useUser';

export default function Home() {
  const t = useTranslations('i18n');
  const { user } = useUser();

  return (
    <Page back={false}>
      <List>
        <UserHeader />
        <Section header="Navigation" />
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link href="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              Init Data
            </Cell>
          </Link>
          <Link href="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">
              Launch Parameters
            </Cell>
          </Link>
          <Link href="/theme-params">
            <Cell subtitle="Telegram application palette information">
              Theme Parameters
            </Cell>
          </Link>
        </Section>
        <Section
          header="Account"
          footer="Account management and settings"
        >
          <Link href="/profile">
            <Cell subtitle="View detailed profile information">
              Profile Details
            </Cell>
          </Link>
        </Section>
        {user?.role === 'ADMIN' && (
          <Section
            header="Admin Panel"
            footer="Administrative functions (Admin only)"
          >
            <Link href="/admin/users">
              <Cell subtitle="Manage all users">
                Users Management
              </Cell>
            </Link>
          </Section>
        )}
        <Section header={t('header')} footer={t('footer')}>
          <LocaleSwitcher />
        </Section>
      </List>
    </Page>
  );
}
