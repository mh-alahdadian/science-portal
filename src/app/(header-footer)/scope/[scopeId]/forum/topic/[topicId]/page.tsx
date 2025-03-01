'use client';

import { queryService } from '@/api';
import { Breadcrumb } from '@/components';
import { getScopeUrl } from '@/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { use } from 'react';
import { NewPost } from './NewPost';
import { Post } from './Post';
import { TopicInfo } from './TopicInfo';

export default function TopicPage(props: PageProps<'scopeId' | 'topicId'>) {
  const params = use(props.params);
  const topic = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/topics/{topicId}', { params: { path: params } })
  ).data;
  const posts = useSuspenseQuery({
    ...queryService('forum:/v1/scope/{scopeId}/topic/{topicId}/messages', { params: { path: params } }),
  }).data.content;

  return (
    <div className="">
      <Breadcrumb
        params={params}
        items={[{ text: 'فروم', url: `${getScopeUrl(params.scopeId)}/forum` }, { text: topic.title }]}
      />

      <div className="flex gap-6">
        <ol className="flex-1 flex flex-col gap-12 p-8 bg-custom3-50 box">
          <li>
            <Post topic={topic} post={topic} />
          </li>
          {posts?.map((post) => (
            <li key={post.id}>
              <Post topic={topic} post={post} />
            </li>
          ))}
          <hr />
          <NewPost topic={topic} params={params} />
        </ol>
        <TopicInfo scopeId={params.scopeId} topic={topic} />
      </div>
    </div>
  );
}
