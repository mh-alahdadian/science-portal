'use client';

import { CaretLeft, UsersFour } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  baseUrl: string;
  topic: Schema<'TopicResponseDTO'>;
}

export function TopicRow({ baseUrl, topic }: Props) {
  return (
    <Link
      href={`${baseUrl}/${topic.id}`}
      key={topic.id}
      className="flex flex-row gap-2 w-full items-center mb-0 hover:bg-gray-200 p-2 rounded-md"
    >
      <UsersFour />
      <div className="flex flex-row justify-between w-full h-full">
        <h5 className="m-0 line-clamp-2 text-sm">{topic.title}</h5>
        <CaretLeft className="shrink-0 self-center" />
      </div>
    </Link>
  );
}
