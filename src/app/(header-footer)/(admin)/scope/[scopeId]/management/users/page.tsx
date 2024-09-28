'use client';

import { queryService } from '@/api';
import { Dialog, Table } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { columns } from './columns';
import UserEditForm from './UserEditForm';
import { RowData, createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

type User = Schema<'UserInfoDTO'>;

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    setEditingUser?: Dispatch<SetStateAction<User | null>>;
    applyUserRegistration?: (user: User, approvalStatus: boolean) => void;
  }
}

export default function UserManagement({ params }: PageProps<'scopeId' | 'id'>) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const usersQuery = useSuspenseQuery(
    queryService('core:/v1/manager/{page}/users', {
      params: {
        path: { page: String(params.scopeId) },
        query: { searchDTO: {}, pageable: { page: 0, size: 20 } },
      },
    })
  );
  const users = usersQuery.data.content!;

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      setEditingUser,
      applyUserRegistration: (user, approval) => {
        // TODO: not implemented backend
      },
    },
  });

  return (
    <>
      <Table
        table={table}
        hasData={!!users}
        hasError={usersQuery.isError}
        refetch={usersQuery.refetch}
        isLoading={usersQuery.isLoading}
      />

      <Dialog open={!!editingUser} onClose={() => setEditingUser(null)}>
        {editingUser && (
          <UserEditForm onClose={() => setEditingUser(null)} user={editingUser} currentScope={params.scopeId} />
        )}
      </Dialog>
    </>
  );
}
