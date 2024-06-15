'use client';

import { queryService } from '@/api';
import { Breadcrumb } from '@/components';
import { useCurrentScope } from '@/hooks';
import { Clock } from '@phosphor-icons/react/dist/ssr';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { newsSingleCard } from 'src/types/news';
import { mockPosts } from '../../blog/mocks';
import NewsCard from './NewsCard';

export default function AllNews({ params }: PageProps<'scopeId' | 'id'>) {
  const scope = useCurrentScope();
  const [isTopNewsSelected, setIsTopNewsSelected] = useState(true);
  const latestNewsMock = useSuspenseQuery({
    ...queryService('news:/v1/manager/{page}/posts', { params: { path: { page: String(params.scopeId) } } }),
    queryFn: mockPosts,
  }).data.content!;

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb params={params} items={[{ text: 'اخبار' }]} />

      {/* hero container */}
      <div className="flex gap-4">
        <div className="w-1/2 overflow-hidden rounded-lg relative">
          <img src="/newsPoster.png" className="w-full h-full" alt="" />
          <div className="absolute bg-gray-900 bg-opacity-50 w-full p-4 bottom-0 left-0">
            <h3 className="font-bold text-lg mb-2">عنوان خبر که میتواند به اندازه خوبی طولانی باشد</h3>
            <div>
              <Clock /> 12:34:54 - 1402/11/01
            </div>
          </div>
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
            <h3 className="text-lg font-bold ">
              عنوان خبر که می‌تواند به اندازه خوبی طولانی باشدعنوان خبر که می‌تواند به اندازه خوبی طولانی باشد
            </h3>
            <h3 className="text-lg">
              عنوان خبر که می‌تواند به اندازه خوبی طولانی باشدعنوان خبر که می‌تواند به اندازه خوبی طولانی باشد
            </h3>
            <h3 className="text-lg">
              عنوان خبر که می‌تواند به اندازه خوبی طولانی باشدعنوان خبر که می‌تواند به اندازه خوبی طولانی باشد
            </h3>
            <h3 className="text-lg">
              عنوان خبر که می‌تواند به اندازه خوبی طولانی باشدعنوان خبر که می‌تواند به اندازه خوبی طولانی باشد
            </h3>
          </div>
        </div>
      </div>

      {/* latest news */}
      <h3 className="text-lg font-bold my-4">تازه ترین اخبار</h3>

      <div className="grid grid-cols-3 gap-6">
        {latestNewsMock.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* most viewed news */}
      <h3 className="text-lg font-bold my-4">پربازدید ترین اخبار</h3>

      <div className="grid grid-cols-4 gap-6">
        {latestNewsMock.slice(0, 4).map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>

      {/* بنر تبلیغاتی */}
      <img src="/commercialBanner.jpg" className="w-full rounded-lg max-h-[400px] object-cover" alt="" />

      {/* اخبار پایین صفحه */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {latestNewsMock.map((item) => (
          <NewsCard key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
}
