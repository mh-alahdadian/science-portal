'use client';

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NewsRow } from '../components/NewsRow';

type PostsService = ReturnType<typeof queryService<'news:/v1/scope/{scopeId}/posts'>>;

interface Props {
  title: string;
  service: PostsService;
}

export default function NewsList(props: Props) {
  const related = useSuspenseQuery(props.service).data.content!;

  return (
    <div className="max-w-xs ">
      <div className="flex flex-row items-center gap-2 mb-4">
        <h3 className="whitespace-nowrap text-gray-500">{props.title}</h3>
        <div className="w-full h-[2px] bg-slate-400"></div>
      </div>
      <div className="flex flex-col">
        {related.map((post) => (
          <NewsRow key={post.id} baseUrl="." post={post} />
        ))}
      </div>
    </div>
  );
}
