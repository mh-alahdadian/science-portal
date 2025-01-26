'use client';

import { queryService } from '@/api';
import { InlineSelectField, InlineTextField, Paginator, Table, Tags } from '@/components';
import { defaultPagination } from '@/constants';
import { useCurrentScope } from '@/hooks';
import { formatDateTime, getFirstParagraph, paginationStateToQuery } from '@/utils';
import { Plus } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Select from 'react-select';
import Community from '../../assets/Community.svg';
import TopicList from '../components/TopicList';

const columnHelper = createColumnHelper<SchemaOf<'forum', 'TopicResponseDTO'>>();

const colDefs = [
  columnHelper.display({
    header: 'تاپیک',
    size: Number.MAX_SAFE_INTEGER,
    cell: (props) => {
      const topic: Schema<'TopicResponseDTO'> = props.row.original!;
      return (
        <Link href={`forum/topic/${topic.id}`}>
          <p className="text-base">{topic.title}</p>
          <p className="text-sm text-opacity-50 whitespace-pre-wrap line-clamp-4 mt-2">
            {getFirstParagraph(topic.content!, 300)}
          </p>
          <Tags tags={topic.tags!} />
          <p className="mt-4">نویسنده: {topic.user?.name}</p>
        </Link>
      );
    },
  }),
  columnHelper.accessor('messageCount', {
    maxSize: 80,
    header: 'پاسخ‌ها',
    enableSorting: false,
  }),
  columnHelper.accessor('lastActivity', {
    maxSize: 200,
    header: 'آخرین تاریخ فعالیت',
    cell: ({ row, cell }) => (cell.getValue() ? formatDateTime(cell.getValue() || row.original.createdAt!) : '-'),
    enableSorting: false,
  }),
];

const schema = {
  type: 'object',
  properties: {
    x: { type: 'string' },
    y: { type: 'string' },
  },
} as const;

const sorts = ['lastActivity,desc', 'createdAt,desc'] as const;

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
  const [searchText, setSearchText] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<(typeof sorts)[number]>(sorts[0]);

  if (+params.scopeId && !categories.length) notFound();

  const mostViewService = queryService('forum:/v1/scope/{scopeId}/topics/view', {
    params: { path: { scopeId: +params.scopeId } },
  });
  const mostControversialService = queryService('forum:/v1/scope/{scopeId}/topics/controversial', {
    params: { path: { scopeId: +params.scopeId } },
  });

  const {
    data: { content: topics, totalPages },
    isError,
    isLoading,
    refetch,
  } = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/topics', {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          ...paginationStateToQuery(pagination),
          ['sort' as any]: selectedSort,
          searchDTO: { title: searchText },
        },
      },
    })
  );

  const table = useReactTable({
    columns: colDefs,
    data: topics!,
    getCoreRowModel: getCoreRowModel(),
    meta: {},
  });

  return (
    <>
      <div className="flex gap-20 items-center">
        <Community />
        <div className="flex flex-col gap-6">
          <p>به فروم حوزه پژوهشی {scope.title} خوش آمدید</p>
          <p>در اینجا شما می‌توانید سوالات و دانش خود را با دیگران به اشتراک بگذارید</p>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between mb-2">
            <div className="flex gap-4">
              <InlineTextField
                className="w-48"
                label="جست‌و‌جو در عنوان"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
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
              <InlineSelectField
                className="w-48"
                label="ترتیب نمایش"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
              >
                <option value={sorts[0]}>تاریخ فعالیت</option>
                <option value={sorts[1]}>تازه‌ترین</option>
              </InlineSelectField>
            </div>
            <Link href={{ pathname: 'forum/write/new' }} role="button" className="btn-primary">
              <Plus />
              سوال جدید
            </Link>
          </div>
          <Table table={table} hasData={!!topics} hasError={isError} isLoading={isLoading} refetch={refetch} />
          <Paginator
            total={totalPages!}
            current={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            changePage={(value) => setPagination({ ...pagination, pageIndex: value - 1 })}
            changePageSize={(value) => setPagination({ ...pagination, pageSize: value })}
          />
        </div>
        <aside className="max-w-sm w-full flex flex-col items-center gap-5 p-8 bg-custom2-50 box">
          <TopicList title="پرمشاهده‌ترین تاپیک‌ها" service={mostViewService} />
          <TopicList title="پربحث‌ترین تاپیک‌ها" service={mostControversialService} />
        </aside>
      </div>
    </>
  );
}
