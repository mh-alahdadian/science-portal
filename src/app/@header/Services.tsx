'use client';

import { useScopePrefix } from '@/hooks';
import Link from 'next/link';

interface Page {
  title: string;
  path: string;
}

const services: Page[] = [
  { title: 'اخبار', path: 'news' },
  { title: 'انجمن', path: 'forum' },
  { title: 'کتابخانه', path: 'library' },
  { title: 'مقالات', path: 'article' },
];

export default function Services({ scopeId }: { scopeId: number }) {
  const prefix = useScopePrefix();

  return (
    <>
      {services.map((page) => (
        <Link key={page.path} role="button" className="btn-link" href={`${prefix}/${page.path}`}>
          {page.title}
        </Link>
      ))}
    </>
  );
}
