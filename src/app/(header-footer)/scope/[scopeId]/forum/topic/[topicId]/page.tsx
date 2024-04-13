'use client';

import { queryService } from '@/api';
import { Breadcrumb } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NewPost } from './NewPost';
import { Post } from './Post';
import { TopicInfo } from './TopicInfo';

type TopicDto = Schema<'TopicResponseDTO'>;
type PostDTO = Schema<'PostResponseDTO'>;

const mockPost: PostDTO = {
  id: 2,
  title: 'عنوان تاپیک که یه تایتل برای تایپک توسط کاربر نوشته شده است',
  content: `
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
`,
  createdAt: new Date().toString(),
  userName: 'نام کاربری',
};

export default function TopicPage({ params }: PageProps<'scopeId' | 'topicId'>) {
  const topic = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/topics/{topicId}', { params: { path: params } }),
  ).data;
  let posts = useSuspenseQuery({
    ...queryService('forum:/v1/scope/{scopeId}/topic/{topicId}/posts', { params: { path: params } }),
  }).data.content;

  posts = [mockPost, mockPost, mockPost];

  return (
    <div className="">
      <Breadcrumb items={[{ text: 'حوزه' }, { text: 'فروم' }, { text: topic.title }]} />
      <div className="flex gap-6">
        <ol className="flex-1 flex flex-col gap-12">
          {posts?.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
          <hr />
          <NewPost params={params} />
        </ol>
        <TopicInfo scopeId={params.scopeId} topic={topic} />
      </div>
    </div>
  );
}
