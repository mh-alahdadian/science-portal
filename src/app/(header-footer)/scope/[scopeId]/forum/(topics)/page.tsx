'use client';

import { queryService } from '@/api';
import { InlineSelectField, InlineTextField, Table, Tags } from '@/components';
import { defaultPagination } from '@/constants';
import { useCurrentScope } from '@/hooks';
import { formatDateTime, getFirstParagraph, paginationStateToQuery } from '@/utils';
import { Plus } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { use, useState } from 'react';
import Select from 'react-select';
import Community from '../../assets/Community.svg';

const columnHelper = createColumnHelper<SchemaOf<'forum', 'TopicResponseDTO'>>();

const colDefs = [
  columnHelper.display({
    header: 'تاپیک',
    size: Number.MAX_SAFE_INTEGER,
    cell: (props) => {
      const topic: any = props.row.original!;
      return (
        <Link href={`topic/${topic.id}`}>
          <p className="text-base">{topic.title}</p>
          <p className="text-sm text-opacity-50 whitespace-pre-wrap line-clamp-4 mt-2">
            {getFirstParagraph(topic.content, 300)}
          </p>
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
  columnHelper.accessor('lastActivity', {
    maxSize: 200,
    header: 'آخرین تاریخ فعالیت',
    // field: 'title',
    // cellDataType: 'string',
    cell: ({ row, cell }) => (cell.getValue() ? formatDateTime(cell.getValue()!) : '-'),
  }),
];

const schema = {
  type: 'object',
  properties: {
    x: { type: 'string' },
    y: { type: 'string' },
  },
} as const;

export default function Forum(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const scope = useCurrentScope();
  const [pagination, setPagination] = useState(defaultPagination);

  const { data: categories, isLoading: loadingCategories } = useSuspenseQuery({
    ...queryService('forum:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
    select: (data) => data.map(({ id, title }) => ({ value: id?.toString(), label: title })),
  });
  const [filteredCategories, setFilteredCategories] = useState<Filter[]>([]);

  const {
    data: { content: topics },
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
    })
  );

  const table = useReactTable({
    columns: colDefs,
    data: topics!,
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
          <p>به فروم حوزه پژوهشی {scope.title} خوش آمدید</p>
          <p>در اینجا شما می‌توانید سوالات و دانش خود را با دیگران به اشتراک بگذارید</p>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="flex gap-4">
          <InlineTextField label="جست‌و‌جو در عنوان" />
          <Select
            isMulti
            isClearable
            isSearchable
            placeholder="موضوعات"
            isLoading={loadingCategories}
            value={filteredCategories}
            options={categories}
            styles={{
              multiValue: (baseStyles) => ({ ...baseStyles, alignItems: 'center' }),
              // control: (baseStyles) => ({ ...baseStyles, height: '48px' }),
              valueContainer: (baseStyles) => ({ ...baseStyles, height: '48px' }),
              container: (baseStyles) => ({ ...baseStyles, minWidth: 300 }),
            }}
            onChange={setFilteredCategories as any}
          />
          <InlineSelectField label="ترتیب نمایش">
            <option>تازه‌ترین</option>
            <option>تاریخ فعالیت</option>
          </InlineSelectField>
        </div>
        <Link href={{ pathname: 'forum/write/new' }} role="button" className="btn-primary">
          <Plus />
          سوال جدید
        </Link>
      </div>
      <Table table={table} hasData={!!topics} hasError={isError} isLoading={isLoading} refetch={refetch} />
    </>
  );
}
