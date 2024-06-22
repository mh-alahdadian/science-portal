'use client';

import { queryService } from '@/api';
import { Paginator } from '@/components';
import { useCurrentScope } from '@/hooks';
import { CaretLeft } from '@phosphor-icons/react';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import NewsCard from './NewsCard';

export default function AllNews({ params }: PageProps<'scopeId' | 'id'>) {
  const scope = useCurrentScope();
  const [isTopNewsSelected, setIsTopNewsSelected] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(19);
  const [perPage, setPerPage] = useState(6);

  const news = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: { path: { scopeId: +params.scopeId }, query: {} },
    }),
  ).data.content!;

  const highlightedNews = news[0];

  const dateTemp: string = new Date(highlightedNews.createAt!).toLocaleString('fa-IR');
  const date: string = dateTemp.slice(0, 10).split('-').join('/');
  const time: string = dateTemp.slice(11, 19);

  const allPagesCount: number = Math.ceil(news.length / 8);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-1 items-center text-gray-500 my-4">
        <span>حوزه های {scope.title}</span> <CaretLeft /> <span>اخبار</span>
      </div>

      {/* hero container */}
      <div className="flex gap-4">
        <div className="w-1/2 overflow-hidden rounded-lg relative">
          <Link href={`news/${highlightedNews.id}`}>
            <img src={`${highlightedNews.coverImage}`} className="w-full h-full" />
            <div className="absolute bg-gray-900 bg-opacity-50 w-full p-4 bottom-0 left-0">
              <h3 className="font-bold text-lg mb-2">{highlightedNews.title}</h3>
              <div>
                <Clock /> {time} - {date}
              </div>
            </div>
          </Link>
        </div>

        <div className="w-1/2">
          <div className="w-full bg-gray-300 rounded-lg">
            <button
              onClick={() => setIsTopNewsSelected(true)}
              className={`btn btn-primary w-1/2 text-black left-0 self-end ${
                isTopNewsSelected ? '' : 'bg-transparent border-none'
              }`}
            >
              برترین اخبار
            </button>

            <button
              onClick={() => setIsTopNewsSelected(false)}
              className={`btn btn-primary w-1/2 text-black left-0 self-end ${
                isTopNewsSelected ? 'bg-transparent border-none' : ''
              }`}
            >
              انتخاب سردبیر
            </button>
          </div>
          <div className="pr-4 mt-4 flex flex-col gap-4">
            {news && isTopNewsSelected
              ? news.slice(0, 5).map((newsItem: Schema<'PostDTO'>) => (
                  <Link key={newsItem.id} href={`news/${newsItem.id}`}>
                    <h3>{newsItem.title}</h3>
                  </Link>
                ))
              : news.slice(20, 25).map((newsItem: Schema<'PostDTO'>) => (
                  <Link key={newsItem.id} href={`news/${newsItem.id}`}>
                    <h3>{newsItem.title}</h3>
                  </Link>
                ))}
          </div>
        </div>
      </div>

      {/* latest news */}
      <h3 className="text-lg font-bold my-4">تازه ترین اخبار</h3>

      <div className="grid grid-cols-3 gap-6">
        {news.slice(0, 3).map((item: Schema<'PostDTO'>) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* most viewed news */}
      <h3 className="text-lg font-bold my-4">پربازدید ترین اخبار</h3>

      <div className="grid grid-cols-4 gap-6">
        {news.slice(0, 4).map((item: Schema<'PostDTO'>) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* بنر تبلیغاتی */}
      <img src="/commercialBanner.jpg" className="w-full rounded-lg max-h-[400px] object-cover" />

      {/* اخبار پایین صفحه */}
      <div className="grid grid-cols-3 gap-6 mt-12">
        {news.slice((currentPage - 1) * perPage, currentPage * perPage).map((item: Schema<'PostDTO'>) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* pagination */}
      <div className="mt-20">
        <Paginator
          current={currentPage}
          total={news.length}
          pageSize={perPage}
          changePage={setCurrentPage}
          changePageSize={setPerPage}
        />
      </div>
    </div>
  );
}
