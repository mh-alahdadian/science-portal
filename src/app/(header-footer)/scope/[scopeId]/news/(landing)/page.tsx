'use client';

import { queryService } from '@/api';
import { Breadcrumb, Paginator } from '@/components';
import { Tabs } from '@/components/Tabs';
import { useCurrentScope } from '@/hooks';
import { createFileUrl, formatDateTime } from '@/utils';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import NewsCard from './NewsCard';

enum NewsTab {
  TOP = 'TOP',
  CHIEF_CHOICES = 'CHIEF_CHOICES',
}

export default function AllNews({ params }: PageProps<'scopeId' | 'id'>) {
  const scope = useCurrentScope();
  const [activeTab, setActiveTab] = useState(NewsTab.TOP);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const topNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'] } as any,
      },
    }),
  ).data.content!;

  const latestNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { pageable: { page: currentPage, size: perPage }, sort: ['id,desc'] } as any,
      },
    }),
  ).data.content!;

  const [activeHero, setActiveHero] = useState(0);
  const highlightedNews = topNews[activeHero];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />

      {/* hero container */}
      <div className="flex gap-4">
        <div className="w-1/2 overflow-hidden rounded-lg relative">
          <Link href={`news/${highlightedNews.id}`}>
            <img src={createFileUrl(highlightedNews.coverImage)} className="w-full h-full" alt="" />
            <div className="absolute bg-gray-900 bg-opacity-50 w-full p-4 bottom-0 left-0">
              <h3 className="font-bold text-lg mb-2">{highlightedNews.title}</h3>
              <div>
                <Clock /> {formatDateTime(highlightedNews.createAt!)}
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/2">
          <Tabs<NewsTab>
            onChange={setActiveTab}
            active={activeTab}
            options={[
              { title: 'برترین اخبار', value: NewsTab.TOP },
              // { title: 'انتخاب سردبیر', value: NewsTab.CHIEF_CHOICES },
            ]}
          />

          <div className="pr-4 mt-6 flex flex-col gap-6">
            {topNews.slice(0, 5).map((newsItem, index) => (
              <Link key={newsItem.id} href={`news/${newsItem.id}`}>
                <h3
                  onMouseEnter={() => setActiveHero(index)}
                  className={clsx('font-bold text-black', index !== activeHero && 'text-opacity-50')}
                >
                  {newsItem.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* latest news */}
      <div>
        <h3 className="mb-6 text-lg font-bold">تازه ترین اخبار</h3>

        <div className="grid grid-cols-3 gap-6">
          {latestNews.slice(0, 3).map((item) => (
            <NewsCard key={item.id} post={item} />
          ))}
        </div>
      </div>

      {/* most viewed news */}
      {/* <div>
        <h3 className="mb-6 text-lg font-bold">پربازدید ترین اخبار</h3>

        <div className="grid grid-cols-4 gap-6">
          {latestNews.slice(0, 4).map((item) => (
            <NewsCard key={item.id} post={item} />
          ))}
        </div>
      </div> */}

      <div className="flex justify-center items-center w-full h-96 rounded-lg bg-cyan-400">بنر تبلیغاتی</div>

      {/* اخبار پایین صفحه */}
      <div className="grid grid-cols-3 gap-6">
        {latestNews.slice((currentPage - 1) * perPage, currentPage * perPage).map((item: Schema<'PostDTO'>) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      <div className="mt-20">
        <Paginator
          current={currentPage}
          total={latestNews.length}
          pageSize={perPage}
          changePage={setCurrentPage}
          changePageSize={setPerPage}
        />
      </div>
    </div>
  );
}
