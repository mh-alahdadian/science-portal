'use client';

import { createFileUrl, fromNow, getFirstParagraph } from '@/utils';
import { css } from '@emotion/react';
import { Chat, Clock, Eye } from '@phosphor-icons/react';
import Link from 'next/link';
import { newsSingleCard } from 'src/types/news';

interface Props {
  post: newsSingleCard;
}

export default function NewsCard({ post }: Props) {
  return (
    <Link href={`./news/${post.id}`} className="flex items-start w-full" css={styles}>
      <div className="h-full grid-area-1">
        <img
          src={createFileUrl(post.coverImage, post.fileKey)}
          alt={post.title}
          height={'100%'}
          className="object-cover pointer-events-none rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 grid-area-2">
        <div className="opacity-50 flex gap-6 text-xs font-medium *:gap-1">
          <span className="flex items-center justify-center">
            <Clock weight="fill" size={16} />
            {fromNow(post.createdAt!)}
          </span>

          <span className="flex items-center justify-center">
            <Eye weight="fill" size={16} color="black" />
            {post.viewCount}
          </span>

          <span className="flex items-center justify-center">
            <Chat weight="fill" size={16} color="black" mirrored />
            {post.feedbackStats?.commentCount || 0}
          </span>
        </div>
        <div className="font-semibold text-base">{post.title}</div>
      </div>
      <div className="w-full text-[#616161] text-sm line-clamp-3 grid-area-3">
        {getFirstParagraph(post.content!, 99999)}
      </div>
    </Link>
  );
}

const styles = css`
  display: grid;
  gap: 0.5rem;
  /* @media (max-width: 1024px) {
    grid-template:
      'area-1 area-2'
      'area-3 area-3'/
      2fr 3fr;
  } */
  grid-template:
    'area-1 area-2' auto
    'area-1 area-3' 1fr /
    2fr 3fr;
`;
