'use client';

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TopicRow } from './TopicRow';

type PostsService = ReturnType<typeof queryService<'forum:/v1/scope/{scopeId}/topics'>>;

interface Props {
  title: string;
  service: PostsService;
}

export default function NewsList(props: Props) {
  const topics = useSuspenseQuery(props.service).data.content!;

  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-2 mb-4">
        <h3 className="whitespace-nowrap text-gray-500">{props.title}</h3>
        <div className="w-full h-[2px] bg-slate-400">{/* empty line */}</div>
      </div>
      <div className="flex flex-col">
        {topics.map((topic) => (
          <TopicRow key={topic.id} baseUrl="." topic={topic} />
        ))}
      </div>
    </div>
  );
}
