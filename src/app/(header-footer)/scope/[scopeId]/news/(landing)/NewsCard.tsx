'use client';

import { useCurrentScope } from '@/hooks';
import { createFileUrl, formatDateTime } from '@/utils';
import Link from 'next/link';
import { newsSingleCard } from 'src/types/news';

interface Props {
  post: newsSingleCard;
}

export default function NewsCard({ post }: Props) {
  const scope = useCurrentScope();

  return (
    <Link href={`./news/${post.id}`} className="p-6 rounded-lg flex flex-col shadow-md gap-4">
      <img src={createFileUrl(post.coverImage)} className="w-full object-contain rounded-md pointer-events-none" alt="" />
      <h4 className="font-bold line-clamp-2">{post.title}</h4>
      <div className="flex justify-between opacity-75">
        <span className="text-sm">{post.author || 'نویسنده خبر'}</span>
        <span className="text-sm">{formatDateTime(post.createdAt!)}</span>
      </div>
    </Link>
  );
}
