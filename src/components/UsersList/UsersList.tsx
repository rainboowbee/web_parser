'use client';

import { useState, useEffect } from 'react';
import { Avatar, Cell, List, Section, Text, Title, Button } from '@telegram-apps/telegram-ui';
import type { User } from '@/types/user';

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: number, newRole: 'USER' | 'ADMIN') => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Обновляем список пользователей
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Text>Loading users...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Text color="red">Error: {error}</Text>
      </div>
    );
  }

  return (
    <List>
      <Section header={`Users (${users.length})`}>
        {users.map((user) => (
          <Cell
            key={user.id}
            before={
              <Avatar
                src={user.photoUrl || undefined}
                alt="User avatar"
                width={40}
                height={40}
              />
            }
            subtitle={`@${user.username || 'No username'} • ${user.role}`}
            after={
              <div style={{ display: 'flex', gap: '8px' }}>
                {user.role === 'USER' ? (
                  <Button
                    size="s"
                    onClick={() => updateUserRole(user.id, 'ADMIN')}
                  >
                    Make Admin
                  </Button>
                ) : (
                  <Button
                    size="s"
                    onClick={() => updateUserRole(user.id, 'USER')}
                  >
                    Make User
                  </Button>
                )}
              </div>
            }
          >
            <Title level="3">
              {user.firstName} {user.lastName}
            </Title>
          </Cell>
        ))}
      </Section>
    </List>
  );
}
