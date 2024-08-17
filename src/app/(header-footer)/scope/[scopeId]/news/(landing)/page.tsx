'use client';

import { queryService } from '@/api';
import { Breadcrumb, Paginator } from '@/components';
import { useCurrentScope } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import Recommendations from 'src/app/(header-footer)/(landing)/components/recommendations';
import NewsCard from './NewsCard';
import { NewsSlider } from './NewsSlider';

export default function AllNews({ params }: PageProps<'scopeId'>) {
  const scope = useCurrentScope();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(6);

  const latestNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { pageable: { page: currentPage, size: perPage }, sort: ['id,desc'] } as any,
      },
    }),
  ).data.content!;

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />

      <NewsSlider params={params} />

      {/* latest news */}
      <h3 className="text-lg font-bold">تازه ترین اخبار</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {latestNews.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
        <div
          className={clsx(
            'flex justify-center items-center',
            'w-full h-96 rounded-lg',
            'row-start-3 md:row-start-2 col-span-full',
          )}
        >
          <Recommendations />
        </div>
      </div>

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
