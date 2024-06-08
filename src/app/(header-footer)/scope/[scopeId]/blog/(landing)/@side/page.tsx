'use client';

import { queryService } from '@/api';
import { TextIcon } from '@/components';
import { CaretLeft, Tag } from '@phosphor-icons/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { AuthorsList } from '../components/AuthorsList';
import { PostRows } from '../components/PostRows';
import { mockTags } from '../mocks';

export default function BlogLandingSidebar({ params }: PageProps<'scopeId'>) {
  const [{ data: tags }] = useSuspenseQueries({
    queries: [{ ...queryService('blog:/v1/scope/{scopeId}/popular-tags' as any, {}), queryFn: mockTags }],
  });

  const bestAuthors = (
    <div className="card card-body gap-4">
      <div className="flex items-center">
        <p className="font-bold text-base">برترین نویسنده‌ها</p>
        <Link href="authors" className="btn btn-link btn-sm btn-primary">
          همه نویسنده‌ها
          <CaretLeft />
        </Link>
      </div>
      <AuthorsList />
    </div>
  );
  const bestPosts = (
    <div className="card card-body gap-4">
      <div className="flex items-center">
        <p className="font-bold text-base">برترین مطالب ماه</p>
      </div>
      <PostRows />
    </div>
  );
  const mostViewsTags = (
    <div className="card card-body gap-4">
      <div className="flex items-center">
        <p className="font-bold text-base">تگ‌های پربازدید ماه</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <TextIcon key={tag.name} className="tag" Icon={Tag} text={tag.name} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {bestAuthors}
      {bestPosts}
      {mostViewsTags}
    </>
  );
}
