'use client';

import { useCurrentScope } from '@/hooks';
import { formatDateTime } from '@/utils';
import { newsSingleCard } from 'src/types/news';

interface Props {
  post: newsSingleCard;
}

export default function NewsCard({ post }: Props) {
  const scope = useCurrentScope();

  return (
    <div className="p-6 rounded-lg flex flex-col shadow-md gap-4">
      <img src={post.coverImage} className="w-full max-h-[273px] rounded-md" alt="" />
      <h4 className="font-bold line-clamp-2">{post.title}</h4>
      <div className="flex justify-between opacity-75">
        <span className="text-sm">{post.author || 'نویسنده خبر'}</span>
        <span className="text-sm">{formatDateTime(post.createAt!)}</span>
      </div>
    </div>
  );
}
