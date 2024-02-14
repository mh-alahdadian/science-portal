// 'use client';

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function News() {
  let { data: posts } = useSuspenseQuery(queryService('news:/posts', { params: { query: { searchDTO: {} } } }));

  const content: (Schema<'PostDTO'> & { banner: string, scopeId: number })[] = posts.content?.length
    ? (posts.content as any)
    : [
        { id: '1', title: 'title 1', banner: 'https://api.slingacademy.com/public/sample-photos/1.jpeg' },
        { id: '2', title: 'title 2', banner: 'https://api.slingacademy.com/public/sample-photos/2.jpeg' },
        { id: '3', title: 'title 3', banner: 'https://api.slingacademy.com/public/sample-photos/3.jpeg' },
        { id: '4', title: 'title 4', banner: 'https://api.slingacademy.com/public/sample-photos/4.jpeg' },
        { id: '5', title: 'title 5', banner: 'https://api.slingacademy.com/public/sample-photos/5.jpeg' },
      ];

  return (
    <div className="grid gap-6" style={{}}>
      <style jsx>{`
        .grid {
          grid-template: auto auto / 1fr 1fr 2fr;
          grid-auto-flow: column;
        }
        .card:last-child {
          grid-row: 1/-1;
        }
        .card.image-full {
          --rounded-box: 0.5rem;
          --padding-card: 1rem;
        }
        .card-body {
          color: white !important;
          background: #14161966;
        }
      `}</style>
      {content.map((x) => (
        <Link href={`/scope/${x.scopeId || 'general'}/news/${x.id}`} key={x.id} className="card image-full rounded-lg">
          <figure>
            <img src={x.banner} alt={x.title} />
          </figure>
          <div className="card-body self-end">
            <p className="card-title">{x.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
