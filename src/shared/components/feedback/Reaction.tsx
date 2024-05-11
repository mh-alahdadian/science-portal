import { mutateService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';

interface Props {
  modelTypeId: ModelType;
  modelId: number;
  type: ReactionType;
  reactions: SchemaOf<'feedback', 'FeedbackStatsDTO'>['reaction'];
}
const IconMap = {
  [ReactionType.LIKE]: ThumbsUp,
  [ReactionType.DISLIKE]: ThumbsDown,
};
export function Reaction(props: Props) {
  const { reactions, type } = props;
  const Icon = IconMap[type];

  const { mutateAsync: mutateReaction } = useMutation(mutateService('post', 'feedback:/v1/reactions'));
  function handleToggleReaction() {
    mutateReaction({ body: { modelId: props.modelId, modelTypeId: props.modelTypeId, type: props.type } });
  }

  return (
    <div className="flex gap-2 items-center hover:bg-gray-200 p-2 rounded-md">
      <Icon /> {reactions?.[type]?.count || '0'}
    </div>
  );
}
