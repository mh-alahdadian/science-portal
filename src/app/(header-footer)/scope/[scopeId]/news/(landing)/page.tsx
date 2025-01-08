'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { use, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import Select from 'react-select';

import { queryService } from '@/api';
import { Breadcrumb, DatePickerField, Paginator } from '@/components';
import NewsCard from './NewsCard';
import { NewsSlider } from './NewsSlider';

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

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [filteredCategories, setFilteredCategories] = useState<Filter[]>([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [currSorting, setCurrSorting] = useState(sorts[0].value);

  // TODO: check the slider arrow buttons works
  // TODO: correct react-select input style

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
    <div className="mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />
      <NewsSlider params={params} />

      <div className="flex items-center justify-between rounded-lg bg-custom2-600 py-3 px-4 gap-4">
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
              }),
            }}
            onChange={setFilteredCategories as any}
          />
          <DatePickerField
            label="تاریخ"
            value={filteredDate}
            style={{ minWidth: 140 }}
            onChange={(date: DateObject) => setFilteredDate(date?.toDate())}
          />
        </div>

        <button className="btn btn-sm text-sm font-normal" onClick={removeFilters}>
          حذف فیلتر‌ها
        </button>
      </div>

      <div className="flex flex-col gap-8 bg-custom1-50 p-8 rounded-3xl">
        <div role="tablist" className="tabs tabs-bordered w-20 mb-4">
          {sorts.map((tab) => (
            <a
              role="tab"
              key={tab.value}
              className={clsx('tab', currSorting === tab.value && 'tab-active')}
              onClick={() => setCurrSorting(tab.value)}
            >
              {tab.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {posts.map((item) => (
            <NewsCard key={item.id} post={item} />
          ))}
        </div>
      </div>
      {/* <Recommendations /> */}

      <Paginator
        current={currentPage}
        total={latestNewsQuery.totalPages!}
        pageSize={perPage}
        changePage={setCurrentPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
