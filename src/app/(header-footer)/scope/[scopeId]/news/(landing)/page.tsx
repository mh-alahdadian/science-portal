'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { use, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import Select from 'react-select';

import { queryService } from '@/api';
import { Breadcrumb, DatePickerField, Paginator } from '@/components';
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
  const [filteredCategories, setFilteredCategories] = useState<Filter[]>([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [currSorting, setCurrSorting] = useState(sorts[0].value);

  const isMostControversial = currSorting === 'commentCount,desc';
  const isViewCount = currSorting === 'viewCount,desc';

  const latestNewsQuery = useSuspenseQuery({
    ...queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          pageable: { page: currentPage, size: perPage },
          sort: [sorts[0].value],

          // TODO: check 'from' and 'to' format to be correct to send one date for both ?
          ...(filteredDate ? { from: filteredDate, to: filteredDate } : {}),
          categoryIds: filteredCategories.map(({ value }) => value),
        } as any,
      },
    }),
  }).data;
  const latestNews = latestNewsQuery.content!;

  const mostControversialNews: any[] = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts/most-controversial', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { periodLength: 7 },
      },
    })
  ).data! as any;

  const posts = isMostControversial
    ? mostControversialNews
    : isViewCount
    ? Array.from(latestNews).sort((a, b) => a.viewCount! - b.viewCount!)
    : latestNews;

  function removeFilters() {
    setFilteredCategories([]);
    setFilteredDate(null);
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
            value={filteredDate}
            style={{ minWidth: 140 }}
            onChange={(date: DateObject) => setFilteredDate(date?.toDate())}
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
        total={latestNewsQuery.totalPages!}
        current={currentPage + 1}
        changePage={(value) => setCurrentPage(value - 1)}
        pageSize={perPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
