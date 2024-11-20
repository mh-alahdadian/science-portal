'use client';

import { mutateService, queryService } from '@/api';
import { Breadcrumb, Table } from '@/components';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { RowData, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { use } from 'react';
import { columns } from './columns';

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    applyMembershipApproval?: (id: number, approvalStatus: boolean) => void;
  }
}

export default function MembershipAdmin(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);

  const { mutateAsync } = useMutation(mutateService('' as any, 'core:/v1/manager/membership' as any));
  const membershipsQuery = useSuspenseQuery(
    queryService('core:/v1/manager/{page}/membership-requests', {
      params: {
        path: { page: String(params.scopeId) },
        query: { searchDTO: {}, pageable: { page: 0, size: 20 } },
      },
    })
  );
  const memberships = membershipsQuery.data.content!

  const table = useReactTable({
    columns,
    data: memberships,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      applyMembershipApproval: (id, approval) => {
        mutateAsync({ body: { id, approval } });
      },
    },
  });

  return (
    <>
      <Breadcrumb params={params} items={[{ text: 'مدیریت اعضا' }]} />
      <Table
        table={table}
        hasData={!!memberships}
        hasError={membershipsQuery.isError}
        refetch={membershipsQuery.refetch}
        isLoading={membershipsQuery.isLoading}
      />
    </>
  );
}
