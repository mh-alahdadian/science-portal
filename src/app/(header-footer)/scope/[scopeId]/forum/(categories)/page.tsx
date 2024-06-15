'use client';

import { queryService } from '@/api';
import { useCurrentScope } from '@/hooks';
import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Community from '../../assets/Community.svg';

const mockImage = `https://api.slingacademy.com/public/sample-photos/{}.jpeg`;

export default function Categories({ params }: PageProps<'scopeId' | 'categoryId'>) {
  const scope = useCurrentScope();
  const categories = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: +params.scopeId } },
    }),
  ).data;

  return (
    <>
      <div className="flex gap-20 items-center bg-nغثeutral-300">
        <Community />
        <div className="flex flex-col gap-6">
          <p>به فروم‌های حوزه {scope.title} خوش آمدید</p>
          <p>در اینجا شما می‌توانید سوالات و دانش خود را با دیگران به اشتراک بگذارید</p>
        </div>
      </div>
      <div className="grid gap-6" css={styles}>
        {categories.map((cat, i) => (
          <Link href={`forum/${cat.id}`} key={cat.id} className="card rounded-lg">
            <figure>
              <img src={cat.coverImage || mockImage.replace('{}', String(i + 1))} alt={cat.title} />
            </figure>
            <div className="card-body w-full text-center self-end">
              <p className="card-title justify-center">{cat.title}</p>
              <p>{cat.topicCount} تاپیک</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const styles = css`
  &.grid {
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: auto;
  }
  & .card {
    width: 10rem;
    height: 10rem;
  }
`;
