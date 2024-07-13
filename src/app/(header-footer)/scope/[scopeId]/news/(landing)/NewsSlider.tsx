import { queryService } from '@/api';
import { Tabs } from '@/components/Tabs';
import { useScreen } from '@/hooks';
import { createFileUrl, formatDateTime } from '@/utils';
import { Clock } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { NewsRow } from '../components/NewsRow';

enum NewsTab {
  TOP = 'TOP',
  CHIEF_CHOICES = 'CHIEF_CHOICES',
}

export function NewsSlider({ params }: Pick<PageProps<'scopeId'>, 'params'>) {
  const [activeHero, setActiveHero] = useState(0);
  const topNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'] } as any,
      },
    }),
  ).data.content!;
  const [activeTab, setActiveTab] = useState(NewsTab.TOP);
  const highlightedNews = topNews[activeHero];

  const { isSmall } = useScreen();

  if (isSmall) {
    return (
      <div className="">
        <Tabs
          onChange={setActiveTab}
          active={activeTab}
          options={[
            { title: 'برترین اخبار', value: NewsTab.TOP as NewsTab },
            // { title: 'انتخاب سردبیر', value: NewsTab.CHIEF_CHOICES },
          ]}
        />

        <div className="pr-4 mt-6 flex flex-col gap-6">
          {topNews.slice(0, 5).map((newsItem, index) => (
            <NewsRow baseUrl="./news" key={newsItem.id} post={newsItem} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="w-1/2 overflow-hidden rounded-lg relative">
        <Link href={`news/${highlightedNews.id}`}>
          <img src={createFileUrl(highlightedNews.coverImage, highlightedNews.fileKey)} className="w-full h-full" alt="" />
          <div className="absolute bg-gray-900 bg-opacity-50 w-full p-4 bottom-0 left-0">
            <h3 className="font-bold text-lg mb-2">{highlightedNews.title}</h3>
            <div>
              <Clock /> {formatDateTime(highlightedNews.createdAt!)}
            </div>
          </div>
        </Link>
      </div>

      <div className="w-1/2">
        <Tabs
          onChange={setActiveTab}
          active={activeTab}
          options={[
            { title: 'برترین اخبار', value: NewsTab.TOP as NewsTab },
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
  );
}
