import { queryService } from '@/api';
import { useCurrentScope } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { use } from 'react';

export default function ArticlePage(props: PageProps<'scopeId' | 'articleId'>) {
  const scope = useCurrentScope();
  const article = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/articles', {
      params: { path: { scopeId: use(props.params).scopeId } },
    })
  ).data?.content!;

  return 'Hi';
}
