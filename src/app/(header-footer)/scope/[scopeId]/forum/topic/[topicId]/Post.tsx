'use client';

import { mutateService } from '@/api';
import { Editor } from '@/components';
import { formatDateTime } from '@/utils';
import { PaperPlaneTilt, ThumbsDown, ThumbsUp, User } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';

interface Props {
  topic: Schema<'TopicResponseDTO'>;
  post: Schema<'MessageResponseDTO'>;
}

const reactionIcon = {
  ThumbsUp: ThumbsUp,
  ThumbsDown: ThumbsDown,
};

function getAvatarPlaceholder(name: string) {
  const words = name.split(' ');
  const letters = words.length > 1 ? [words[0][0], words[1][1]] : [words[0][0], words[0][1]];
  return letters;
}

export function Post(props: Props) {
  let { post, topic } = props;

  post.messages = [post];

  const reaction = post.feedbackStats?.reaction || {};
  const { mutate } = useMutation(mutateService('post', 'forum:/v1/scope/{scopeId}/topic/messages'));

  const reactions = Object.entries(reaction)?.map(([key, r]) => {
    const Icon = reactionIcon[key as keyof typeof reactionIcon];
    return (
      <button key={key} className="flex items-center gap-2">
        {r!.count}
        <Icon size={20} weight={r!.userReacted ? 'fill' : 'regular'} />
      </button>
    );
  });
  return (
    <div className="flex gap-2">
      <div className="avatar rounded-full placeholder bg-neutral text-neutral-content justify-center items-center w-10 h-10">
        {post.userName ? getAvatarPlaceholder(post.userName).map((l) => <span>{l}</span>) : <User size={32} />}
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm h-10">
          <p className="font-bold">{post.userName || 'ناشناس'}</p>
          <time className="text-black text-opacity-50" dateTime={post.createdAt}>
            {formatDateTime(post.createdAt!)}
          </time>
        </div>
        {/* <div>
            {post.tags}
        </div> */}
        <div className="font-bold">{topic.title}</div>
        <Editor
          className="text-black text-opacity-50"
          data={post.content}
          uploadData={{ fileKey: (post as any).fileKey }}
          readonly
        />
        {reactions?.length && <div className="flex gap-6 ">{reactions}</div>}
        <div>
          {post.messages.map((m: typeof post) => (
            <div>
              <span>{m.content}</span>
              <span>{formatDateTime(m.createdAt!)}</span>
              <span>{m.userName}</span>
            </div>
          ))}
        </div>
        <form
          className="relative"
          onSubmit={(event) => {
            event.preventDefault();
            const content = new FormData(event.currentTarget!).get('content') as string;
            mutate({
              params: { path: { scopeId: topic.scopeId } },
              body: { topicId: topic.id, parentId: post.id, content },
            });
          }}
        >
          <textarea name="content" className="textarea pe-8 w-full h-full" placeholder="نوشتن کامنت جدید" />
          <button className="absolute bottom-4 left-4 btn-circle btn-sm">
            <PaperPlaneTilt mirrored />
          </button>
        </form>
      </div>
    </div>
  );
}
