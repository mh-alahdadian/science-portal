'use client';

import { mutateService, queryService } from '@/api';
import { Paginator, Table } from '@/components';
import { defaultPagination } from '@/constants';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { columns } from './cols';

function paginationStateToQuery(state: typeof defaultPagination) {
  return {
    pageable: {
      page: state.pageIndex,
      size: state.pageSize,
    },
  };
}

export default function Admin({ params }: PageProps<'scopeId' | 'id'>) {
  const [pagination, setPagination] = useState(defaultPagination);

  const { data, isLoading, refetch, isError } = useSuspenseQuery({
    ...queryService('news:/v1/manager/{page}/posts', {
      params: {
        path: { page: String(params.scopeId) },
        query: {
          ...paginationStateToQuery(pagination),
        },
      },
    }),
  });

  const { mutate } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts/{postId}/status'));

  const table = useReactTable({
    columns,
    data: data.content!,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: data.totalPages,
    state: { pagination },
    meta: { handleChangeStatus },
  });

  function handleChangeStatus(e: any, id: string) {
    mutate(
      { params: { path: { page: String(params.scopeId!), postId: +id }, query: { statusId: e.target.value } } });
  }

  return (
    <div className="">
      <Table table={table} hasData={!!data} hasError={isError} isLoading={isLoading} refetch={refetch} />
      <Paginator
        total={table.getPageCount()}
        current={pagination.pageIndex}
        changePage={table.setPageIndex}
        pageSize={pagination.pageSize}
        changePageSize={table.setPageSize}
      />
    </div>
  );
}
