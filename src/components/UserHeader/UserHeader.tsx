'use client';

import { Avatar, Cell, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { useUser } from '@/hooks/useUser';
import './UserHeader.css';

export function UserHeader() {
  const { user, loading, error } = useUser();

  if (loading) {
    return (
      <Section>
        <Cell>
          <Text>Loading user information...</Text>
        </Cell>
      </Section>
    );
  }

  if (error || !user) {
    return (
      <Section>
        <Cell>
          <Text color="red">Failed to load user information</Text>
        </Cell>
      </Section>
    );
  }



  return (
    <Section className="user-header">
      <Cell
        className="cell"
        before={
          <div style={{ position: 'relative' }}>
            <Avatar
              className="avatar"
              src={user.photoUrl || undefined}
              alt="User avatar"
              width={70}
              height={70}
            />
            {user.isPremium && (
              <div className="premium-badge">
                ⭐
              </div>
            )}
          </div>
        }
        subtitle={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <div className="role-badge">
              {user.role}
            </div>
            <div className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        }
      >
        <Title level="2" className="title">
          {user.firstName} {user.lastName}
        </Title>
        {user.username && (
          <Text className="username">
            @{user.username}
          </Text>
        )}
        <Text className="last-seen">
          Last seen: {user.lastSeen.toLocaleDateString()}
        </Text>
      </Cell>
    </Section>
  );
}
