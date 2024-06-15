'use client';

import { mutateService, queryService } from '@/api';
import { Paginator } from '@/components';
import { useCurrentScope } from '@/hooks';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { columns } from './cols';

export default function Admin({ params }: PageProps<'scopeId' | 'id'>) {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const scope = useCurrentScope();

  const data = useSuspenseQuery({
    ...queryService('news:/v1/manager/{page}/posts', {
      params: { path: { page: String(params.scopeId) }, query: {} },
    }),

    queryFn: () => {
      return {
        totalPages: 1,
        totalElements: 1,
        size: 1,
        content: [
          {
            id: 1,
            title: 'string',
            coverImage: 'string',
            content: 'string',
            statusId: 2,
            userId: 2,
            categoryId: 2,
            isPublic: true,
            publishAt: '2022/12/12 , 12:12',

            updateAt: '2022/12/12 , 12:12',
          },
        ],
      };
    },
  }).data;

  const { mutate } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts/{postId}/status'));

  const table = useReactTable({
    columns,
    data: data.content!,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    pageCount: data.totalPages,
    state: {
      //...
      pagination,
    },
    meta: { handleChangeStatus },
  });

  function handleChangeStatus(e: any, id: string) {
    mutate({ params: { path: { page: String(params.scopeId!), postId: +id }, query: { statusId: e.target.value } } });
  }

  return (
    <div className="pr-10 py-8">
      <table className="w-full min-w-fit">
        <thead className="bg-gray-400">
          <tr>
            <th className="py-2">عنوان</th>
            <th className="py-2">زمان ایجاد</th>
            <th className="py-2">وضعیت انتشار</th>
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            const c = new Date(row.original.createAt!).toLocaleString('fa-IR');

            return (
              <tr key={row.id} className={`${index % 2 ? 'bg-gray-200' : ''}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
