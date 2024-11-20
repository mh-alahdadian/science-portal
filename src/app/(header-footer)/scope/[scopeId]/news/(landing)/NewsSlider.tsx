import { queryService } from '@/api';
import { useScreen, useSlider } from '@/hooks';
import { createFileUrl, fromNow } from '@/utils';
import { Eye } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { NewsRow } from '../components/NewsRow';

const SLIDER_COUNT = 5;

function getFirstParagraph(content: string) {
  const idx = content.indexOf('</p>');
  return idx ? content.slice(3, idx) : '';
}

export function NewsSlider({ params }: { params: Awaited<PageProps<'scopeId'>['params']> }) {
  const topNews = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'], pageable: { size: SLIDER_COUNT } } as any,
      },
    })
  ).data.content!;

  const { isSmall } = useScreen();

  const { sliderButtons } = useSlider({ ids: topNews.map((n) => n.id!) });

  if (isSmall) {
    return (
      <div className="">
        <div className="pr-4 mt-6 flex flex-col gap-6">
          {topNews.slice(0, SLIDER_COUNT).map((newsItem: any) => (
            <NewsRow baseUrl="./news" key={newsItem.id} post={newsItem} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="carousel rounded-lg w-full h-60">
      {topNews.map((post, index) => (
        <div key={post.id} id={`slider-item-${index}`} className="carousel-item w-full">
          <Link href={`./news/${post.id}`} className="flex items-start w-full gap-8">
            <div className="h-full">
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
                  {post.viewCount}
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
