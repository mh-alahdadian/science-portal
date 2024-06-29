'use client';

import { useCurrentScope } from '@/hooks';
import { createFileUrl } from '@/utils';
import { CaretLeft } from '@phosphor-icons/react';
import Link from 'next/link';
import { newsSingleCard } from 'src/types/news';

interface Props {
    baseUrl: string
  post: newsSingleCard;
}

export function NewsRow({ baseUrl, post }: Props) {
  return (
    <Link
      href={`${baseUrl}/${post.id}`}
      key={post.id}
      className="flex flex-row gap-2 w-full items-center mb-0 hover:bg-gray-200 p-2 rounded-md"
    >
      <img src={createFileUrl(post.coverImage)} className="w-[80px] h-[58px] object-cover rounded-lg" alt="" />
      <div className="flex flex-row justify-between w-full h-full">
        <h5 className="m-0 line-clamp-2 text-sm">{post.title}</h5>
        <CaretLeft className="shrink-0 self-center" />
      </div>
    </Link>
  );
}
