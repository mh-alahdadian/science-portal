import { queryService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { createFileUrl, formatDateTime } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Reaction } from './Reaction';

interface Props {
  // scopeId: number;
  modelTypeId: ModelType;
  modelId: number;
}

type Comment = Schema<'CommentResponseDTO'> & { userImage: string; feedbackStats: Schema<'FeedbackStatsDTO'> };

export function CommentsList(props: Props) {
  const comments = useQuery(
    queryService('feedback:/v1/comments', {
      params: { query: { dto: { modelId: props.modelId, modelTypeId: props.modelTypeId } } },
    })
  ).data?.content!;

  return (
    <div className="p-6 pb-0 rounded-lg bg-white mt-10 flex flex-col">
      <h5 className="font-bold text-xl mb-4">دیدگاه ها</h5>
      {comments.map((commentItem) => (
        <div key={commentItem.id} className="flex flex-col border-b border-gray-300 last:border-0 mb-3 pb-3">
          {/* username and detail container */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={createFileUrl(commentItem.userImage, commentItem.fileKey)}
                className="w-[40px] h-[40px] rounded-full"
              />
              <span>{commentItem.userName}</span>
            </div>
            <time className="text-gray-500" dateTime={commentItem.createdAt}>
              {formatDateTime(commentItem.createdAt!)}
            </time>
          </div>
          <p className="my-3 whitespace-pre-wrap text-gray-500">{commentItem.text}</p>

          {/* like container */}
          <div className="flex gap-8 self-end text-gray-500">
            {[ReactionType.LIKE, ReactionType.DISLIKE].map((type) => (
              <Reaction
                key={type}
                modelTypeId={ModelType.COMMENT}
                modelId={commentItem.id!}
                reactions={commentItem.reaction!}
                type={type}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
