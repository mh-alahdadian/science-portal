import { queryService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { Reaction } from './Reaction';

interface Props {
  // scopeId: number;
  modelTypeId: ModelType;
  modelId: number;
}

type Comment = Schema<'CommentResponseDTO'> & { userImage: string; feedbackStats: Schema<'FeedbackStatsDTO'> };

const mock: Comment = {
  userName: 'علی',
  userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&s',
  createAt: '1402/11/21 11:26',
  text: 'یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.',
  feedbackStats: { reaction: { [ReactionType.LIKE]: { count: 47, userReacted: false } } as any },
};

export function CommentsList(props: Props) {
  let comments = useQuery(
    queryService('feedback:/v1/comments', {
      params: { query: { dto: { modelId: props.modelId, modelTypeId: props.modelTypeId } } },
    }),
  ).data?.content;

  if (!comments?.length) comments = [mock, mock];

  return (
    <div className="p-6 pb-0 rounded-lg bg-white mt-10 flex flex-col">
      <h5 className="font-bold text-xl mb-4">دیدگاه ها</h5>
      {comments.map((commentItem) => (
        <div key={commentItem.id} className="flex flex-col border-b border-gray-300 last:border-0 mb-3 pb-3">
          {/* username and detail container */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={commentItem.userImage} className="w-[40px] h-[40px] rounded-full" />
              <span>{commentItem.userName}</span>
            </div>
            <time className="text-gray-500" dateTime={commentItem.createAt}>
              {new Date(commentItem.createAt!).toLocaleString()}
            </time>
          </div>
          <p className="my-3 text-gray-500">{commentItem.text}</p>

          {/* like container */}
          <div className="flex gap-8 self-end text-gray-500">
            <Reaction {...props} reactions={commentItem.reaction!} type={ReactionType.LIKE} />
            <Reaction {...props} reactions={commentItem.reaction!} type={ReactionType.DISLIKE} />
          </div>
        </div>
      ))}
    </div>
  );
}
