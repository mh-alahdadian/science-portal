'use client';

import { queryService } from '@/api';
import { Breadcrumb, DataFilter } from '@/components';
import { useCurrentScope } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import Community from '../../assets/Community.svg';
import Article from './Article';

const schema = {
  type: 'object',
  properties: {
    x: { type: 'string' },
    y: { type: 'string' },
  },
} as const;

export default function Categories({ params }: PageProps<'scopeId'>) {
  const scope = useCurrentScope();
  const categories = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/categories', {
      params: { path: { scopeId: params.scopeId } },
    }),
  ).data;
  const articles = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/articles', {
      params: { path: { scopeId: params.scopeId } },
    }),
  ).data?.content!;

  return (
    <>
      <Breadcrumb params={params} items={[{ text: 'مقالات' }]} />
      <div className="flex gap-20 items-center bg-neutral-300">
        <Community />
        <div className="flex flex-col gap-6">
          <p>به فروم‌های حوزه پژوهشی {scope.title} خوش آمدید</p>
          <p>در اینجا شما می‌توانید سوالات و دانش خود را با دیگران به اشتراک بگذارید</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <DataFilter schema={schema} />
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
