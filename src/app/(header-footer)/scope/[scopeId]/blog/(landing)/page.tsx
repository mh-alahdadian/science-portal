'use client';;
import { use } from "react";

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PostCard } from './components/PostCard';

export default function BlogLandingPage(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const pathParams = { scopeId: params.scopeId };
  const categories = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/categories', { params: { path: pathParams } }),
  ).data;
  const articles = useSuspenseQuery({
    ...queryService('article:/v1/scope/{scopeId}/articles', { params: { path: pathParams } }),
  }).data?.content!;

  return (
    <>
      {articles.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
