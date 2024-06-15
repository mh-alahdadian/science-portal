'use client';

import { mutateService, queryService } from '@/api';
import { useCurrentScope } from '@/hooks';
import { ChatsCircle, NewspaperClipping } from '@phosphor-icons/react/dist/ssr';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { columns } from './cols';

import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import TopicsTab from './AdminTopicsTab';

// @ts-ignore

export default function Admin({ params }: PageProps<'scopeId' | 'id'>) {
  const [pageNumber, setPageNumber] = useState(1);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const scope = useCurrentScope();

  const data = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/posts', {
      params: { path: { scopeId: +params.scopeId }, query: {} },
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
  }).data.content;

  const { mutate } = useMutation(mutateService('post', 'news:/v1/manager/{page}/posts/{postId}/status'));

  const table = useReactTable({
    columns,
    data: data!,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      //...
      pagination,
    },
    meta: { handleChangeStatus },
  });

  const categories = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: +params.scopeId } },
    }),

    queryFn: () => {
      return [
        {
          title: 'title',
          id: 1,
          scopeId: 1,
          parentId: 1,
          children: [],
        },
      ];
    },
  }).data;

  function handleChangeStatus(e: any, id: string) {
    debugger;
    mutate({ params: { path: { page: String(params.scopeId!), postId: +id }, query: { statusId: e.target.value } } });
  }

  return (
    <div className="max-w-7xl mx-auto ">
      {/* sidebar */}
      <div className="basis-8 flex flex-col justify-center h-[90vh] gap-6 fixed top-0 right-0">
        <button
          onClick={() => {
            setPageNumber(0);
          }}
        >
          <ChatsCircle size={64} />
        </button>

        <button
          onClick={() => {
            setPageNumber(1);
          }}
        >
          <NewspaperClipping size={64} />
        </button>
      </div>

      {/* main */}
      <div className="w-full">
        {/* topics section */}
        {pageNumber === 0 && (
          <div className="pr-10">
            <TopicsTab scopeId={params.scopeId} />
          </div>
        )}

        {/* news section */}
        {pageNumber === 1 && (
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
                      {row.getVisibleCells().map((cell: any) => (
                        <td key={cell.id} className="py-2">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex gap-4 justify-center mt-3">
              <button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                {'<<'}
              </button>
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                {'<'}
              </button>
              <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                {'>'}
              </button>
              <button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                {'>>'}
              </button>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <span>
                صفحه
                {pageNumber}
                از
                {Math.ceil(data?.length! / pagination.pageSize)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
