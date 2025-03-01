// 'use client';

import { queryService } from '@/api';
import { createFileUrl } from '@/utils';
import { getScopeUrl } from '@/utils/scope';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function News() {
  let { data: posts } = useSuspenseQuery(
    queryService('news:/v1/scope/{scopeId}/posts', {
      params: { path: { scopeId: 0 }, query: { pageable: { size: 5 } } },
    })
  );

  const content = posts.content!;

  return (
    <div className="grid gap-6" css={styles}>
      {content.map((x) => (
        <Link href={`${getScopeUrl(x.scopeId!)}/news/${x.id}`} key={x.id} className="card p-0 image-full rounded-lg">
          <figure>
            <img src={createFileUrl(x.coverImage, x.fileKey)} alt={x.title} />
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
    grid-template: auto auto / 2fr 1fr 1fr;
    grid-auto-flow: column;
  }
  & .card:first-child {
    grid-row: 1/-1;
  }
  @media (max-width: 768px) {
    &.grid {
      grid-template: auto auto auto / 1fr 1fr;
      grid-auto-flow: row;
    }
    & .card:first-child {
      grid-column: 1/-1;
    }
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
