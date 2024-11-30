'use client';

import { Editor } from '@/components';
import { formatDateTime } from '@/utils';
import { ThumbsDown, ThumbsUp, User } from '@phosphor-icons/react';

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

  const reaction = post.feedbackStats?.reaction || {};

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
        <div className="flex gap-6 ">
          {Object.entries(reaction)?.map(([key, r]) => {
            const Icon = reactionIcon[key as keyof typeof reactionIcon];
            return (
              <button key={key} className="flex items-center gap-2">
                {r!.count}
                <Icon size={20} weight={r!.userReacted ? 'fill' : 'regular'} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
