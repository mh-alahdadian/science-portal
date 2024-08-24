'use client';

import { queryService } from '@/api';
import { Breadcrumb, Paginator } from '@/components';
import { useCurrentScope } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Recommendations from 'src/app/(header-footer)/(landing)/components/recommendations';
import NewsCard from './NewsCard';
import { NewsSlider } from './NewsSlider';

export default function AllNews({ params }: PageProps<'scopeId'>) {
  const scope = useCurrentScope();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 6;
  const latestNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { pageable: { page: currentPage, size: perPage }, sort: ['id,desc'] } as any,
      },
    }),
  ).data.content!;

  const mostCommented: any[] = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts/most-controversial', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { periodLength: 7 },
      },
    }),
  ).data! as any;

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />

      <NewsSlider params={params} />

      {/* most commented news */}
      <h3 className="text-lg font-bold">پربحث‌ترین اخبار</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {mostCommented.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      <Recommendations />

      {/* latest news */}
      <h3 className="text-lg font-bold">تازه‌ترین اخبار</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {latestNews.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      <Paginator
        current={currentPage}
        total={latestNews.length}
        pageSize={perPage}
        changePage={setCurrentPage}
        // changePageSize={setPerPage}
      />
    </div>
  );
}
