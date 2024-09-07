'use client';

import { mutateService, queryService } from '@/api';
import { Paginator, Table } from '@/components';
import { Filter } from '@/components/filter';
import { defaultPagination } from '@/constants';
import { combineQueries } from '@/query';
import { filterStateToQuery, paginationStateToQuery, sortingStateToQuery } from '@/utils';
import { css } from '@emotion/react';
import { Plus } from '@phosphor-icons/react';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { indexBy, isEmpty, prop } from 'ramda';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { columns } from './cols';

export default function Admin({ params }: PageProps<'scopeId'>) {
  const [pagination, setPagination] = useState(defaultPagination);
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const queryClient = useQueryClient();

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

  const { mutateAsync: mutateStatus } = useMutation(
    mutateService('patch', 'news:/v1/manager/{page}/posts/{postId}/status'),
  );
  const { mutateAsync: mutateBulkPublish } = useMutation(
    mutateService('post', 'news:/v1/manager/{page}/posts/publish'),
  );

  const table = useReactTable({
    columns,
    data: posts.content!,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    pageCount: posts.totalPages,
    state: { pagination, columnFilters: filter, sorting, rowSelection },
    meta: { handleChangeStatus, categories: indexBy(prop('id'), categories) },
  });

  async function handleChangeStatus(e: any, postId: number) {
    await mutateStatus({
      params: { path: { page: String(params.scopeId!), postId }, query: { statusId: e.target.value } },
    });
    queryClient.invalidateQueries({ queryKey: ['news:/v1/manager/{page}/posts'] });
    toast.success('وضعیت با موفقیت تغییر کرد.');
  }

  async function putData(publish: boolean) {
    await mutateBulkPublish({
      params: {
        path: { page: String(params.scopeId!) },
        query: { postIds: Object.keys(rowSelection).map(Number), publish },
      },
    });
    queryClient.invalidateQueries({ queryKey: ['news:/v1/manager/{page}/posts'] });
    toast.success('وضعیت‌ها با موفقیت تغییر کردند.');
    setRowSelection({});
  }

  return (
    <div className="">
      <Filter table={table} css={filterStyles} className="mb-4" />
      {!isEmpty(rowSelection) && (
        <div className="flex items-center justify-between mt-4 bg-sand p-2 rounded-lg">
          <p>{Object.keys(rowSelection).length} ردیف انتخاب شده</p>
          <div className="flex items-center gap-3">
            <p
              className="rounded-lg shadow-sm p-2 cursor-pointer text-[green] bg-[#C9ECC7]"
              onClick={() => putData(true)}
            >
              منتشر کردن
            </p>
            <p
              className="rounded-lg shadow-sm p-2 cursor-pointer text-[red] bg-[#F4CECE]"
              onClick={() => putData(false)}
            >
              لغو انتشار
            </p>
          </div>
        </div>
      )}

      <Table table={table} hasData={!!posts} hasError={isError} isLoading={isLoading} refetch={refetch} />
      <Paginator
        total={table.getPageCount()}
        current={pagination.pageIndex}
        changePage={table.setPageIndex}
        pageSize={pagination.pageSize}
        changePageSize={table.setPageSize}
      />
      <Link role="button" className="btn-lg btn-primary btn-circle fab" href="../write/draft">
        <Plus size={36} />
      </Link>
    </div>
  );
}

const filterStyles = css`
display: grid;
grid: repeat(2, auto) / repeat(6, auto);

label:not([class*="col-span"]) {
  grid-column: span 2 / span 2;
}
`;
