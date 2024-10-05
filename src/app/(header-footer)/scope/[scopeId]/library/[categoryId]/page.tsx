'use client';

import { queryService } from '@/api';
import { DataFilter } from '@/components';
import { TextIcon } from '@/components/TextIcon';
import { useCurrentScope } from '@/hooks';
import { createFileUrl } from '@/utils';
import { CaretLeft, Download } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Community from '../../assets/Community.svg';
import { BookInfo } from '../components/BookInfo';

type Book = Schema<'ResponseDTO'>;

const schema = {
  type: 'object',
  properties: {
    x: { type: 'string' },
    y: { type: 'string' },
  },
} as const;

export default function Library({ params }: PageProps<'scopeId' | 'categoryId'>) {
  const scope = useCurrentScope();
  const books = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books', {
      params: {
        path: params,
        query: {
          searchDTO: { categoryId: params.categoryId, scopeId: params.scopeId } as any,
        },
      },
    })
  ).data.content!;

  return (
    <>
      <div className="flex gap-20 items-center bg-neutral-300">
        <Community />
        <div className="flex flex-col gap-6">
          <p>
            به کتابخانه {params.categoryId} حوزه پژوهشی {scope.title} خوش آمدید
          </p>
          <p>در اینجا شما می‌توانید کتاب‌های مختلف در این حوزه پژوهشی را دانلود کنید</p>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <DataFilter schema={schema} />
      </div>
      <div className="grid max-md:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, i) => (
          <Link href={`book/${book.id}`} key={book.id} className="card card-body bg-white rounded-lg">
            <figure>
              <img src={createFileUrl(book.coverImage, book.fileKey)} alt={book.name} />
            </figure>
            <BookInfo book={book} />
            <hr />
            <div className="flex justify-between items-center">
              <TextIcon Icon={Download} text={5700 + 'بار دانلود'} />
              <button className="btn-primary btn-link">
                مشاهده بیشتر
                <CaretLeft />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
