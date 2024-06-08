'use client';

import { queryService } from '@/api';
import { useCurrentScope } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ArticlePage({ params }: PageProps<'scopeId' | 'postId'>) {
  const scope = useCurrentScope();
  const article = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/articles', {
      params: { path: { scopeId: params.scopeId } },
    }),
  ).data?.content!;

  return 'Hi';
}
