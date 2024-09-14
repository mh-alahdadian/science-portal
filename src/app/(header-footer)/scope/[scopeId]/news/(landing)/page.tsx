'use client';

import { DateObject } from 'react-multi-date-picker';
import clsx from 'clsx';
import Select from 'react-select';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Recommendations from 'src/app/(header-footer)/(landing)/components/recommendations';

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

interface Filter {
  value?: string;
  label: string;
}

export default function AllNews({ params }: PageProps<'scopeId'>) {
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

  const latestNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: {
          pageable: { page: currentPage, size: perPage },
          sort: [currSorting],

          // TODO: check 'from' and 'to' format to be correct to send one date for both ?
          ...(filteredDate ? { from: filteredDate, to: filteredDate } : {}),
          categoryIds: filteredCategories.map(({ value }) => value),
        } as any,
      },
    }),
  ).data.content!;

  const mostControversialNews: any[] = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts/most-controversial', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { periodLength: 7 },
      },
    }),
  ).data! as any;

  function handleCategoryFilterChange(newFilter: Filter[]) {
    setFilteredCategories(newFilter);
  }

  function removeFilters() {
    setFilteredCategories([]);
    setFilteredDate(null);
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />
      <NewsSlider params={params} />

      <div
        className="flex items-center justify-between rounded-lg bg-white py-3 px-4 gap-4"
        style={{ backgroundColor: '#f5f7f8' }}
      >
        <div className="w-full flex gap-3">
          <Select
            isMulti
            isClearable
            isSearchable
            placeholder="موضوعات"
            isLoading={loadingCategories}
            value={filteredCategories}
            options={categories}
            // styles={{
            //   control: (baseStyles) => ({
            //     ...baseStyles,
            //     maxHeight: 42,
            //   }),
            // }}
            onChange={handleCategoryFilterChange as any}
          />
          <DatePickerField
            label="تاریخ"
            value={filteredDate}
            style={{ minWidth: 70 }}
            onChange={(date: DateObject) => setFilteredDate(date?.toDate())}
          />
        </div>

        <button className="btn btn-sm text-sm font-normal" onClick={removeFilters}>
          حذف فیلتر‌ها
        </button>
      </div>

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
        {(currSorting === 'commentCount,desc' ? mostControversialNews : latestNews).map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* <Recommendations /> */}

      <Paginator
        current={currentPage}
        total={latestNews.length}
        pageSize={perPage}
        changePage={setCurrentPage}
        changePageSize={setPerPage}
      />
    </div>
  );
}
