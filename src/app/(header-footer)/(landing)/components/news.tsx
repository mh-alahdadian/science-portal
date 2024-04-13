// 'use client';

import { fileManagerUrl, queryService } from '@/api';
import { getScopeUrl } from '@/utils/scope';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function News() {
  let { data: posts } = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: { path: { scopeId: 0 }, query: { pageable: { size: 5 } } },
    }),
  );

  const content: (Schema<'PostDTO'> & { scopeId: number })[] = posts.content?.length
    ? (posts.content as any)
    : [
        { id: '1', title: 'title 1', coverImage: 'https://api.slingacademy.com/public/sample-photos/1.jpeg' },
        { id: '2', title: 'title 2', coverImage: 'https://api.slingacademy.com/public/sample-photos/2.jpeg' },
        { id: '3', title: 'title 3', coverImage: 'https://api.slingacademy.com/public/sample-photos/3.jpeg' },
        { id: '4', title: 'title 4', coverImage: 'https://api.slingacademy.com/public/sample-photos/4.jpeg' },
        { id: '5', title: 'title 5', coverImage: 'https://api.slingacademy.com/public/sample-photos/5.jpeg' },
      ];

  return (
    <div className="grid gap-6" css={styles}>
      {content.map((x) => (
        <Link href={`${getScopeUrl(x.scopeId)}/news/${x.id}`} key={x.id} className="card image-full rounded-lg">
          <figure>
            <img src={fileManagerUrl + x.coverImage} alt={x.title} />
          </figure>
          <div className="card-body self-end">
            <p className="card-title">{x.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

const styles = css`
  &.grid {
    grid-template: auto auto / 1fr 1fr 2fr;
    grid-auto-flow: column;
  }
  & .card:last-child {
    grid-row: 1/-1;
  }
  & .card.image-full {
    --rounded-box: 0.5rem;
    --padding-card: 1rem;
  }
  & .card-body {
    color: white !important;
    background: #14161966;
  }
`;
