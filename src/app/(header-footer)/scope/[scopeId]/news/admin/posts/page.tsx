'use client';

import { mutateService, queryService } from '@/api';
import { Paginator, Table } from '@/components';
import { Filter } from '@/components/filter';
import { defaultPagination } from '@/constants';
import { combineQueries } from '@/query';
import { filterStateToQuery, paginationStateToQuery, sortingStateToQuery } from '@/utils';
import { css } from '@emotion/react';
import { useMutation, useSuspenseQueries } from '@tanstack/react-query';
import { ColumnFiltersState, SortingState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { indexBy, prop } from 'ramda';
import { useState } from 'react';
import { columns } from './cols';

export default function Admin({ params }: PageProps<'scopeId'>) {
  const [pagination, setPagination] = useState(defaultPagination);
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);

  const [[posts, categories], { isError, isLoading, refetch }] = useSuspenseQueries({
    queries: [
      queryService('news:/v1/manager/{page}/posts', {
        params: {
          path: { page: String(params.scopeId) },
          query: {
            ...paginationStateToQuery(pagination),
            ...filterStateToQuery(filter),
            ...sortingStateToQuery(sorting),
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
    onColumnFiltersChange: setFilter,
    onSortingChange: setSorting,
    pageCount: posts.totalPages,
    state: { pagination, columnFilters: filter, sorting },
    meta: { handleChangeStatus, categories: indexBy(prop('id'), categories) },
  });

  function handleChangeStatus(e: any, postId: number) {
    mutate({ params: { path: { page: String(params.scopeId!), postId }, query: { statusId: e.target.value } } });
  }

  return (
    <div className="">
      <div className="flex justify-between gap-4 mb-4">
        <Filter table={table} css={filterStyles} />
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

const filterStyles = css`
display: grid;
grid: repeat(2, auto) / repeat(6, auto);

label:not(.col-2) {
  grid-column: span 2 / span 2;
}
.col-2 {
  order: -1;
  width: 100%;
  grid-column: span 3 / span 3;
}
`;
