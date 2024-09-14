'use client';

import { useCurrentScope } from '@/hooks';
import { createFileUrl, formatDateTime, fromNow } from '@/utils';
import Link from 'next/link';
import { newsSingleCard } from 'src/types/news';
import { Eye } from '@phosphor-icons/react';

interface Props {
  post: newsSingleCard;
}

export default function NewsCard({ post }: Props) {
  const idx = post.content?.indexOf('</p>');
  const firstContentParagraph = idx ? post.content?.slice(3, idx) : '';

  return (
    <Link href={`./news/${post.id}`} className="flex items-start w-full">
      <div className="h-full w-2/5">
        <img
          src={createFileUrl(post.coverImage, post.fileKey)}
          alt={post.title}
          height={'100%'}
          className="object-cover rounded-md pointer-events-none rounded-lg"
        />
      </div>
      <div className="px-2 flex flex-col gap-2 w-3/5">
        <div className="opacity-50 flex gap-3 text-xs font-medium">
          <span className="flex items-center justify-center">{fromNow(post.createdAt!)}</span>

          <span className="flex items-center justify-center">
            <Eye size={18} color="black" className="ml-1" />
            {post.viewCount}{' '}
          </span>
        </div>

        <div className="font-medium">{post.title}</div>

        {firstContentParagraph && (
          <div className="w-full h-full opacity-75 text-sm">{firstContentParagraph.slice(0, 80)}...</div>
        )}
      </div>
    </Link>
  );
}
