import { queryService } from '@/api';
import { Tabs } from '@/components/Tabs';
import { useScreen } from '@/hooks';
import { createFileUrl, fromNow } from '@/utils';
import { Eye } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NewsRow } from '../components/NewsRow';

const SLIDER_COUNT = 5;

enum NewsTab {
  TOP = 'TOP',
  CHIEF_CHOICES = 'CHIEF_CHOICES',
}

function getFirstParagraph(content: string) {
  const idx = content.indexOf('</p>');
  return idx ? content.slice(3, idx) : '';
}

export function NewsSlider({ params }: Pick<PageProps<'scopeId'>, 'params'>) {
  const topNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'], pageable: { size: SLIDER_COUNT } } as any,
      },
    })
  ).data.content!;

  // const [activeHero, setActiveHero] = useState(0);
  const [activeTab, setActiveTab] = useState(NewsTab.TOP);

  const { isSmall } = useScreen();

  function setActiveHero(x: { id?: number }) {
    document.getElementById(`news-${x.id!}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  useEffect(() => {
    let index = 0;
    let interval = setTimeout(() => {
      setActiveHero(topNews[(index + 1) % SLIDER_COUNT]);
    }, 5000);
    return () => {
      clearTimeout(interval);
    };
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
          {topNews.slice(0, SLIDER_COUNT).map((newsItem: any) => (
            <NewsRow baseUrl="./news" key={newsItem.id} post={newsItem} />
          ))}
        </div>
      </div>
    );
  }

  function sliderButtons(pIndex: number) {
    return (
      <div className="mt-auto flex w-full justify-center gap-2 py-2">
        {topNews.map((post, index) => (
          <span
            className={clsx('btn btn-xs', pIndex === index ? 'text-[darkorange]' : '')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveHero(post);
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="carousel rounded-lg w-full h-60">
      {topNews.map((post, index) => (
        <div key={post.id} id={`news-${post.id}`} className="carousel-item w-full">
          <Link href={`./news/${post.id}`} className="flex items-start w-full">
            <div className="h-full w-2/5">
              <img
                src={createFileUrl(post.coverImage, post.fileKey)}
                alt={post.title}
                className="object-cover pointer-events-none rounded-lg h-full"
              />
            </div>
            <div className="px-2 flex flex-col gap-2 w-3/5 h-full">
              <div className="opacity-50 flex gap-3 text-xs font-medium">
                <span className="flex items-center justify-center">{fromNow(post.createdAt!)}</span>

                <span className="flex items-center justify-center">
                  <Eye size={18} color="black" className="ml-1" />
                  {post.viewCount}{' '}
                </span>
              </div>

              <div className="font-medium">{post.title}</div>

              {getFirstParagraph(post.content!) && (
                <div className="w-full h-full opacity-75 text-sm">
                  {getFirstParagraph(post.content!).slice(0, 500)}...
                </div>
              )}
              {sliderButtons(index)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
