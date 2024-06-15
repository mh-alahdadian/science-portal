'use client';

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PostCard } from './components/PostCard';

export default function BlogLandingPage({ params }: PageProps<'scopeId'>) {
  const pathParams = { scopeId: params.scopeId };
  const categories = useSuspenseQuery(
    queryService('article:/v1/scope/{scopeId}/categories', { params: { path: pathParams } }),
  ).data;
  const articles = useSuspenseQuery({
    ...queryService('article:/v1/scope/{scopeId}/articles', { params: { path: pathParams } }),
    // queryFn: mockPosts,
  }).data?.content!;

  return (
    <>
      {articles.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
