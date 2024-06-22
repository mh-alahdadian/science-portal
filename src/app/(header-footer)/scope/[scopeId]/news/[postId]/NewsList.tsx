'use client';

import { queryService } from '@/api';
import { createFileUrl } from '@/utils';
import { CaretLeft } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

type PostsService = ReturnType<typeof queryService<'news:/v1/scope/{scopeId}/posts'>>;

interface Props {
  title: string;
  service: PostsService;
}

export default function NewsList(props: Props) {
  const related = useSuspenseQuery(props.service).data.content!;

  return (
    <div className="max-w-[300px] ">
      <div className="flex flex-row items-center gap-2 mb-4">
        <h3 className="whitespace-nowrap text-gray-500">{props.title}</h3>
        <div className="w-full h-[2px] bg-slate-400"></div>
      </div>
      <div className="flex flex-col">
        {related.map((item) => (
          <Link
            href={`./${item.id}`}
            key={item.id}
            className="flex flex-row gap-2 w-full items-center mb-0 hover:bg-gray-200 p-2 rounded-md"
          >
            <img src={createFileUrl(item.coverImage)} className="w-[80px] h-[58px] object-cover rounded-lg" alt="" />
            <div className="flex flex-row justify-between w-full h-full">
              <h5 className="m-0 line-clamp-2 text-sm">{props.title}</h5>
              <CaretLeft className="shrink-0 self-center" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
