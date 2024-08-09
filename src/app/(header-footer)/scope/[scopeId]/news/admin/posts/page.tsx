'use client';

import { mutateService, queryService } from '@/api';
import { Paginator, Table } from '@/components';
import { Filter } from '@/components/filter';
import { defaultPagination } from '@/constants';
import { combineQueries } from '@/query';
import { paginationStateToQuery } from '@/utils';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { indexBy, prop } from 'ramda';
import { useState } from 'react';
import { columns } from './cols';

export default function Admin({ params }: PageProps<'scopeId'>) {
  const [pagination, setPagination] = useState(defaultPagination);

  const [[posts, categories], { isError, isLoading, refetch }] = useSuspenseQueries({
    queries: [
      queryService('news:/v1/manager/{page}/posts', {
        params: {
          path: { page: String(params.scopeId) },
          query: {
            ...paginationStateToQuery(pagination),
            ...{ sort: 'id,desc' },
          },
        },
      }),
      queryService('news:/v1/scope/{scopeId}/categories', { params: { path: params } }),
    ],
    combine: combineQueries,
  });

  const { mutate } = useMutation(mutateService('patch', 'news:/v1/manager/{page}/posts/{postId}/status'));

  const table = useReactTable({
    columns,
    data: posts.content!,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: posts.totalPages,
    state: { pagination },
    meta: { handleChangeStatus, categories: indexBy(prop('id'), categories) },
  });

  function handleChangeStatus(e: any, postId: number) {
    mutate({ params: { path: { page: String(params.scopeId!), postId }, query: { statusId: e.target.value } } });
  }

  return (
    <div className="">
      <div className="flex justify-between gap-4 mb-4">
        <Filter table={table} />
        <Link role="button" className="btn-primary" href="../write/draft">
          ایجاد خبر
        </Link>
      </div>
      <Table table={table} hasData={!!posts} hasError={isError} isLoading={isLoading} refetch={refetch} />
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
