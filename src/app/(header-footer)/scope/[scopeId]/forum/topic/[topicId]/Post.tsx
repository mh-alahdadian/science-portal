'use client';

import { mutateService } from '@/api';
import { Editor } from '@/components';
import { createFileUrl, formatDateTime } from '@/utils';
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

  function getUserInfo(post: Schema<'MessageResponseDTO'>) {
    const userAvatar = post.user ? (
      post.user.coverImage ? (
        <img className="rounded-full" src={createFileUrl(post.user.coverImage, post.user.fileKey)} />
      ) : post.user.name ? (
        getAvatarPlaceholder(post.user.name).map((l) => <span>{l}</span>)
      ) : null
    ) : null;

    const user = post.user
      ? {
          avatar: userAvatar,
          name: post.user.name,
        }
      : {
          avatar: <User size={32} />,
          name: 'ناشناس',
        };
    return user;
  }

  return (
    <div className="flex gap-2">
      <div className="avatar rounded-full placeholder bg-neutral text-neutral-content justify-center items-center w-10 h-10">
        {getUserInfo(post).avatar}
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm h-10">
          <p className="font-bold">{getUserInfo(post).name}</p>
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
        {reactions?.length ? <div className="flex gap-6 ">{reactions}</div> : null}
        <div>
          {post.replies?.map((m: typeof post) => (
            <div className="flex gap-4">
              <span>{m.content}</span>
              <span className="text-blue-500">{getUserInfo(m).name}</span>
              <span className="text-opacity-50" dir="ltr">
                {formatDateTime(m.createdAt!)}
              </span>
            </div>
          ))}
        </div>
        <form
          className="relative"
          onSubmit={(event) => {
            event.preventDefault();
            const content = new FormData(event.currentTarget!).get('content') as string;
            mutate({
              params: { path: { scopeId: topic.scopeId! } },
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
