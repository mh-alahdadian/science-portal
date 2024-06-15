'use client';

import { useCurrentScope } from '@/hooks';
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react/dist/ssr';

import { newsCommentType, newsSingleComment } from 'src/types/news';

export default function NewsComments(props: newsCommentType) {
  const scope = useCurrentScope();

  return (
    <div className="p-6 pb-0 rounded-lg bg-white mt-10 flex flex-col">
      <h5 className="font-bold text-xl mb-4">دیدگاه ها</h5>

      {props.items.map((commentItem: newsSingleComment) => (
        <div className="flex flex-col border-b border-gray-300 last:border-0 mb-3 pb-3">
          {/* username and detail container */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={commentItem.userImg} className="w-[40px] h-[40px] rounded-full" />
              <span>{commentItem.userName}</span>
            </div>
            <span className="text-gray-500">
              {commentItem.date} - {commentItem.time}
            </span>
          </div>
          <p className="my-3 text-gray-500">{commentItem.content}</p>

          {/* like container */}
          <div className="flex gap-8 self-end text-gray-500">
            <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-md">
              <ThumbsUp /> {commentItem.likes ? commentItem.likes : '0'}
            </div>
            <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-md">
              <ThumbsDown /> {commentItem.dislikes ? commentItem.dislikes : '0'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
