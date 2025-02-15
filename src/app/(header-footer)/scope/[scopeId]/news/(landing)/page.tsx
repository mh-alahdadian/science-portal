'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { use, useDeferredValue, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import Select from 'react-select';

import { queryService } from '@/api';
import { Breadcrumb, DatePickerField, InlineTextField, Paginator } from '@/components';
import { useCurrentScope } from '@/hooks';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { notFound } from 'next/navigation';
import BackGround from '../assets/news-bg.png';
import NewsCard from './NewsCard';

const sorts: { value: string; label: string }[] = [
  {
    value: 'id,desc',
    label: 'جدیدترین‌ها',
  },
  {
    value: 'viewCount,desc',
    label: 'پربازدیدترین‌ها',
  },
  {
    value: 'commentCount,desc',
    label: 'پربحث‌ترین‌ها',
  },
];

export default function AllNews(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const { data: categories, isLoading: loadingCategories } = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
    select: (data) => data.map(({ id, title }) => ({ value: id?.toString(), label: title })),
  });

  if (+params.scopeId && !categories.length) notFound();
  const scope = useCurrentScope();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Filter[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [currSorting, setCurrSorting] = useState(sorts[0].value);

  const newsQuery = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          pageable: { page: currentPage, size: perPage, sort: [currSorting] },
          searchDTO: {
            title: useDeferredValue(searchText) || undefined,
            categoryIds: filteredCategories.map(({ value }) => +value!),
            // TODO: check 'from' and 'to' format to be correct to send one date for both ?
            from: (fromDate as any) || undefined,
            to: (toDate as any) || undefined,
          },
        },
      },
    }),
  }).data;
  const posts = newsQuery.content!;

  function removeFilters() {
    setSearchText('');
    setFilteredCategories([]);
    setFromDate(null);
    setToDate(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        className="text-white bg-cover bg-no-repeat hero-section"
        style={{ backgroundImage: `url(${BackGround.src})` }}
      >
        <Breadcrumb className="m-0" params={params} items={[{ text: 'اخبار' }]} />
        <h1 className="text-4xl font-bold mt-4 mb-16">اخبار حوزه {scope.title}</h1>
      </div>
      {/* <NewsSlider params={params} /> */}

      <div className="flex items-center justify-between rounded-lg bg-[#f5f7f8] -mt-16 p-4 gap-4">
        <div className="w-full flex gap-3">
          <InlineTextField
            containerClassName="input-lg"
            className="w-40"
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
              multiValue: (baseStyles) => ({
                ...baseStyles,
                alignItems: 'center',
              }),

              container: (baseStyles) => ({
                ...baseStyles,
                minWidth: 300,
                background: '#ccc',
              }),
            }}
            onChange={setFilteredCategories as any}
          />
          <DatePickerField
            label="از تاریخ"
            value={fromDate}
            style={{ minWidth: 140 }}
            onChange={(date: DateObject) => setFromDate(date?.toDate())}
          />
          <DatePickerField
            label="تا تاریخ"
            value={toDate}
            style={{ minWidth: 140 }}
            onChange={(date: DateObject) => setToDate(date?.toDate())}
          />
        </div>

        <button className="btn btn-sm text-base font-medium text-[#0a97b3]" onClick={removeFilters}>
          <ArrowCounterClockwise color="#0a97b3" />
          حذف فیلتر‌ها
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <div role="tablist" className="tabs tabs-bordered w-20 mb-4">
          {sorts.map((tab) => (
            <a
              role="tab"
              key={tab.value}
              className={clsx('tab', currSorting === tab.value && '[--fallback-bc:#0a97b3] text-[#0a97b3] tab-active')}
              onClick={() => setCurrSorting(tab.value)}
            >
              {tab.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
          {posts.map((item) => (
            <NewsCard key={item.id} post={item} />
          ))}
        </div>
      </div>
      {/* <Recommendations /> */}

      <Paginator
        total={newsQuery.totalPages!}
        current={currentPage + 1}
        changePage={(value) => setCurrentPage(value - 1)}
        pageSize={perPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
