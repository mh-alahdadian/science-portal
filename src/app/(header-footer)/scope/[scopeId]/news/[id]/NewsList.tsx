'use client';
import { newsListType, singleNewsItem } from 'src/types/news';

import { useCurrentScope } from '@/hooks';
import NewsListSingleItem from './NewsListSingleItem';

export default function NewsList(props: newsListType) {
  const scope = useCurrentScope();

  return (
    <div className="max-w-[300px] ">
      <div className="flex flex-row items-center gap-2 mb-4">
        <h3 className="whitespace-nowrap text-gray-500">{props.title}</h3>
        <div className="w-full h-[2px] bg-slate-400"></div>
      </div>
      <div className="flex flex-col">
        {props.items?.map((item: singleNewsItem) => {
          return <NewsListSingleItem image={item.image} title={item.title} />;
        })}
      </div>
    </div>
  );
}
