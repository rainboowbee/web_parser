'use client';

import { Avatar, Cell, List, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { useUser } from '@/hooks/useUser';
import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

export function UserProfile() {
  const { user, loading, error, telegramUser } = useUser();

  if (loading) {
    return (
      <Page>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text>Loading user profile...</Text>
        </div>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text color="red">Error: {error}</Text>
        </div>
      </Page>
    );
  }

  if (!user) {
    return (
      <Page>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text>No user data available</Text>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <List>
        <Section>
          <Cell
            before={
              <Avatar
                src={user.photoUrl || undefined}
                alt="User avatar"
                width={60}
                height={60}
              />
            }
            subtitle={`@${user.username || 'No username'}`}
          >
            <Title level="3">
              {user.firstName} {user.lastName}
            </Title>
          </Cell>
        </Section>

        <DisplayData
          header="User Information"
          rows={[
            { title: 'Telegram ID', value: user.telegramId.toString() },
            { title: 'Role', value: user.role },
            { title: 'Language', value: user.languageCode || 'Not set' },
            { title: 'Premium', value: user.isPremium },
            { title: 'Active', value: user.isActive },
            { title: 'Last Seen', value: user.lastSeen.toLocaleString() },
            { title: 'Created', value: user.createdAt.toLocaleString() },
          ]}
        />

        <DisplayData
          header="Telegram Permissions"
          rows={[
            { title: 'Added to Attachment Menu', value: user.addedToAttachmentMenu },
            { title: 'Allows Write to PM', value: user.allowsWriteToPm },
          ]}
        />
      </List>
    </Page>
  );
}
