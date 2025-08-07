'use client';

import { useUser } from '@/hooks/useUser';
import { Text } from '@telegram-apps/telegram-ui';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Text>Loading...</Text>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      fallback || (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text color="red">Access denied. Admin privileges required.</Text>
        </div>
      )
    );
  }

  return <>{children}</>;
}
