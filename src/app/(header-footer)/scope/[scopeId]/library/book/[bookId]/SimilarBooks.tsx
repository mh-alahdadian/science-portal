'use client';

import { queryService } from '@/api';
import { createFileUrl } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BookInfo } from '../../components/BookInfo';

interface Props extends PageProps<'scopeId' | 'bookId'> {
  tags: number[];
}

export function SimilarBooks({ params, tags }: Props) {
  const similarBooks = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books', {
      params: {
        path: params,
        query: { pageable: { size: 4 }, tags } as any,
      },
    })
  ).data.content!;
  return (
    <div className="mt-10 card card-body bg-white flex flex-col gap-3">
      <span className="text-black text-opacity-50">کتاب‌های مشابه</span>
      {similarBooks.map((b) => (
        <Link key={b.id} href={`${b.id}`} className="flex gap-4">
          <img src={createFileUrl(b.coverImage, b.fileKey)} width={90} alt="" />
          <BookInfo book={b} />
        </Link>
      ))}
    </div>
  );
}
