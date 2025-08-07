import { UsersList } from '@/components/UsersList/UsersList';
import { AdminGuard } from '@/components/AdminGuard/AdminGuard';
import { Page } from '@/components/Page';

export default function AdminUsersPage() {
  return (
    <Page>
      <AdminGuard>
        <UsersList />
      </AdminGuard>
    </Page>
  );
}
