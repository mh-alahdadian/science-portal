'use client';

import { queryService } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";


export default function Forum({ params }: PageProps<'scopeId' | 'topicId'>) {
  const topic = useSuspenseQuery(queryService('forum:/v1/scope/{scopeId}/topics/{topicId}', { params: { path: params as any } })).data;

  return (
    <div className="flex gap-20 items-center bg-neutral-300">
      <p>{topic.title}</p>
      <p>{topic.content}</p>
    </div>
);
}
