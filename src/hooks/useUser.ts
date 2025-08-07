'use client';

import { useEffect, useState } from 'react';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import type { User } from '@/types/user';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const telegramUser = useSignal(initData.user);

  useEffect(() => {
    if (!telegramUser) {
      setLoading(false);
      return;
    }

    const syncUser = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(telegramUser),
        });

        if (!response.ok) {
          throw new Error('Failed to sync user');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [telegramUser]);

  return {
    user,
    loading,
    error,
    telegramUser,
  };
}
