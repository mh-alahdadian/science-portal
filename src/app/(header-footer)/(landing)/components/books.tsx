'use client';

import { getScopeUrl } from '@/utils/scope';
import { css } from '@emotion/react';
import { BoundingBox, Download } from '@phosphor-icons/react';
import Link from 'next/link';

const imageUrl = 'https://api.slingacademy.com/public/sample-photos';

export default function Books() {
  // let { data: posts } = useSuspenseQuery(queryService('library:/v1/books', { params: { query: { searchDTO: {} } } }));
  const books = { content: [] };

  const category: Schema<'CategoryDTO'> = { id: 1, title: 'sadasdasd' };
  const content: { id: string; category: Schema<'CategoryDTO'>; title: string; banner: string; scopeId: number }[] = [
    { id: '1', title: 'روان‌شناسی', banner: imageUrl + '/1.jpeg', category, scopeId: 1 },
    { id: '2', title: 'روان‌شناسی', banner: imageUrl + '/2.jpeg', category, scopeId: 1 },
    { id: '3', title: 'روان‌شناسی', banner: imageUrl + '/3.jpeg', category, scopeId: 1 },
    { id: '4', title: 'روان‌شناسی', banner: imageUrl + '/4.jpeg', category, scopeId: 1 },
    { id: '5', title: 'روان‌شناسی', banner: imageUrl + '/5.jpeg', category, scopeId: 1 },
    { id: '6', title: 'روان‌شناسی', banner: imageUrl + '/6.jpeg', category, scopeId: 1 },
  ];

  return (
    <div className="flex gap-6" css={styles}>
      {content.map((x) => (
        <Link href={`${getScopeUrl(x.scopeId)}/library/${x.id}`} key={x.id} className="card card-body gap-4 rounded-lg">
          <figure>
            <img src={x.banner} alt={x.title} />
          </figure>
          <p className="card-title">{x.title}</p>
          <div>
            <div>
              <BoundingBox /> {x.category.title}
            </div>
            <div>
              <Download /> {'unknown'}
            </div>
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
