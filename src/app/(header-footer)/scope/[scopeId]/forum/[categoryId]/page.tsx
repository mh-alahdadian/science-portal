'use client';

import { queryService } from '@/api';
import { DataFilter, Table, Tags } from '@/components';
import { defaultPagination } from '@/constants';
import { useCurrentScope } from '@/hooks';
import { formatDateTime, paginationStateToQuery } from '@/utils';
import { Plus } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { GridOptions } from 'ag-grid-community';
import Link from 'next/link';
import { useState } from 'react';
import Community from '../../assets/Community.svg';

type Topic = Schema<'TopicResponseDTO'>;
type Options = GridOptions<Topic>;

const columnHelper = createColumnHelper<SchemaOf<'forum', 'CategoryDTO'>>();

const colDefs = [
  columnHelper.display({
    header: 'تاپیک',
    size: Number.MAX_SAFE_INTEGER,
    cell: (props) => {
      const topic: any = props.row.original!;
      return (
        <Link href={`topic/${topic.id}`}>
          <p className="text-base">{topic.title}</p>
          <p className="text-sm text-opacity-50 whitespace-pre-wrap line-clamp-4 mt-2">{topic.content}</p>
          <Tags tags={topic.tags!} />
        </Link>
      );
    },
  }),
  columnHelper.accessor('title', {
    maxSize: 80,
    header: 'پاسخ‌ها',
    cell: () => (Math.random() * 100).toFixed(),
  }),
  columnHelper.accessor('updateAt', {
    maxSize: 200,
    header: 'آخرین تاریخ فعالیت',
    // field: 'title',
    // cellDataType: 'string',
    cell: () => formatDateTime(Date.now() - Math.random() * 1000_000_000),
  }),
];

const schema = {
  type: 'object',
  properties: {
    x: { type: 'string' },
    y: { type: 'string' },
  },
} as const;

export default function Forum({ params }: PageProps<'scopeId' | 'categoryId'>) {
  const scope = useCurrentScope();
  const [pagination, setPagination] = useState(defaultPagination);

  const {
    data: { content: posts },
    isError,
    isLoading,
    refetch,
  } = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/topics', {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          ...paginationStateToQuery(pagination),
        },
      },
    }),
  );

  const table = useReactTable({
    columns: colDefs,
    data: posts!,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    meta: {},
  });

  return (
    <>
      <div className="flex gap-20 items-center bg-nغثeutral-300">
        <Community />
        <div className="flex flex-col gap-6">
          <p>
            به فروم {params.categoryId} حوزه پژوهشی {scope.title} خوش آمدید
          </p>
          <p>در اینجا شما می‌توانید سوالات و دانش خود را با دیگران به اشتراک بگذارید</p>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <DataFilter schema={schema} />
        <Link
          href={{ pathname: 'topic/new', query: { categoryId: params.categoryId } }}
          role="button"
          className="btn-primary"
        >
          <Plus />
          سوال جدید
        </Link>
      </div>
      <Table table={table} hasData={!!posts} hasError={isError} isLoading={isLoading} refetch={refetch} />
    </>
  );
}
