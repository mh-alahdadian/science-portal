'use client';

import { queryService } from '@/api';
import { TextIcon } from '@/components/TextIcon';
import { createFileUrl } from '@/utils';
import { getScopeUrl } from '@/utils/scope';
import { css } from '@emotion/react';
import { BoundingBox, Download } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

const imageUrl = 'https://api.slingacademy.com/public/sample-photos';

export default function Books() {
  let { data: books } = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books', {
      params: { path: { scopeId: 0 }, query: { pageable: { size: 5 } } },
    })
  );
  // const books = { content: [] };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" css={styles}>
      {books.content?.map((x) => (
        <Link
          href={`${getScopeUrl(x.category?.scopeId!)}/library/${x.id}`}
          key={x.id}
          className="card card-body gap-4 rounded-lg"
        >
          <figure>
            <img src={createFileUrl(x.coverImage, x.fileKey)} alt={x.name} />
          </figure>
          <p className="card-title">{x.name}</p>
          <div className="flex gap-4">
            <TextIcon Icon={BoundingBox} text={x.category?.title!} />
            <TextIcon Icon={Download} text={x.downloadCount} />
          </div>
        </Link>
      ))}
    </div>
  );
}

const styles = css`
  & .card {
    --rounded-box: 0.5rem;
    --padding-card: 1rem;
  }
`;
