import { queryService } from '@/api';
import { Tabs } from '@/components/Tabs';
import { useScreen } from '@/hooks';
import { createFileUrl, formatDateTime } from '@/utils';
import { Clock } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NewsRow } from '../components/NewsRow';
import internal from 'stream';

enum NewsTab {
  TOP = 'TOP',
  CHIEF_CHOICES = 'CHIEF_CHOICES',
}

export function NewsSlider({ params }: Pick<PageProps<'scopeId'>, 'params'>) {
  const topNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'] } as any,
      },
    })
  ).data.content!;

  const [activeHero, setActiveHero] = useState(1);
  const [activeTab, setActiveTab] = useState(NewsTab.TOP);
  const interval = useRef<ReturnType<typeof setInterval>>(null);

  const { isSmall } = useScreen();
  const highlightedNews = topNews[activeHero];

  useEffect(() => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        if (activeHero === 5) {
          setActiveHero(0);
        } else {
          setActiveHero((value) => value + 1);
        }
      }, 5000);
    }
  }, []);

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
          {topNews.slice(0, 5).map((newsItem: any) => (
            <NewsRow baseUrl="./news" key={newsItem.id} post={newsItem} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="carousel rounded-lg w-full">
      <div id={highlightedNews.id?.toString()} className="carousel-item relative w-full" style={{ maxHeight: 700 }}>
        <Link href={`news/${highlightedNews.id}`} className="w-full h-full w-full">
          <img src={createFileUrl(highlightedNews.coverImage, highlightedNews.fileKey)} className="w-full h-full" />
        </Link>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
        <div
          className="absolute right-0 bottom-0 transform bg-gray-900 w-full text-white p-2"
          style={{ backgroundColor: 'rgba(0 , 0 ,0, .5)' }}
        >
          <div className="text-lg font-bold">{highlightedNews.title}</div>
          <div>
            <Clock size={18} className="ml-1" />
            {formatDateTime(highlightedNews.createdAt!)}
          </div>
        </div>
      </div>
    </div>
  );
}
