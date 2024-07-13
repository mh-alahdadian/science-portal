'use client';

import { queryService } from '@/api';
import { Editor, TextIcon } from '@/components';
import { CommentsList, SubmitComment } from '@/components/feedback';
import { ModelType } from '@/constants';
import { createFileUrl, formatDateTime } from '@/utils';
import { Eye } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import humanFormat from 'human-format';
import { AuthorInfo } from '../../(landing)/components/AuthorInfo';
import { BlogPostMock, mockPosts } from '../../mocks';
import { PostCard } from './components/PostCard';

export default function BlogPostPage({ params }: PageProps<'scopeId' | 'postId'>) {
  const post: BlogPostMock = useSuspenseQuery({
    ...queryService('article:/v1/scope/{scopeId}/post/{postId}' as any, { params: { path: params } }),
    queryFn: () => mockPosts().content![0],
  }).data;

  const relatedPosts: BlogPostMock[] = useSuspenseQuery({
    ...queryService('article:/v1/scope/{scopeId}/post/{postId}/related' as any, { params: { path: params } }),
    queryFn: () => mockPosts().content!,
  }).data;

  return (
    <>
      <div className="flex items-center gap-4">
        <AuthorInfo author={post.author} />
        <time dateTime={post.createAt}>{formatDateTime(post.createAt!)}</time>
        <TextIcon Icon={Eye} text={humanFormat(62000)} />
      </div>
      <img src={createFileUrl(post.coverImage)} alt={`cover of postId=${post.id}`} />
      <h1 className="font-bold">{post.title}</h1>
      <Editor readonly data={post.content} />
      <h3 className="font-bold">مطالب مشابه</h3>
      <div className="flex gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <SubmitComment scopeId={params.scopeId} modelTypeId={ModelType.BlogPost} modelId={post.id!} />
      <CommentsList modelTypeId={ModelType.BlogPost} modelId={post.id!} />
    </>
  );
}
