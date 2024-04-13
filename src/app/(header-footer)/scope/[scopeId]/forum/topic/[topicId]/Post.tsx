'use client';

import { Editor } from '@/components';
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react';

interface Props {
  post: Schema<'PostResponseDTO'>;
}

const reactionIcon = {
  ThumbsUp: ThumbsUp,
  ThumbsDown: ThumbsDown,
};

export function Post(props: Props) {
  let { post } = props;
  const c = new Date(post.createdAt!).toLocaleString('fa-IR');

  const reaction = post.feedbackStats?.reaction || [
    {
      reactionType: 'ThumbsUp',
      count: '5',
      userReacted: true,
    },
    {
      reactionType: 'ThumbsDown',
      count: '9',
    },
  ];

  return (
    <div className="flex gap-2">
      <div className="avatar w-10 h-10">MH</div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between text-sm">
          <p className="font-bold">{post.userName}</p>
          <time className="text-black text-opacity-50" dateTime={post.createdAt}>
            {c}
          </time>
        </div>
        {/* <div>
            {post.tags}
        </div> */}
        <div className="font-bold">{post.title}</div>
        <Editor className="text-black text-opacity-50" data={post.content} disabled={true} />
        <div className="flex gap-6 ">
          {reaction.map((r) => {
            const Icon = reactionIcon[r.reactionType! as keyof typeof reactionIcon];
            return (
              <button key={r.reactionType} className="flex items-center gap-2">
                {r.count}
                <Icon size={20} weight={r.userReacted ? 'fill' : 'regular'} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
