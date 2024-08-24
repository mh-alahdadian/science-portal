import { mutateService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  type: ReactionType;
  reactions: SchemaOf<'feedback', 'FeedbackStatsDTO'>['reaction'];
} & ({ modelTypeId: ModelType; modelId: number } | { modelTypeId?: undefined; modelId?: undefined });

const IconMap = {
  [ReactionType.LIKE]: ThumbsUp,
  [ReactionType.DISLIKE]: ThumbsDown,
};
export function Reaction(props: Props) {
  const { reactions, type } = props;
  const Icon = IconMap[type];

  const [reactionData, setReactionData] = useState(reactions?.[type] || { userReacted: false, count: 0 });

  const isAction = !!props.modelTypeId;
  const { mutateAsync: mutateReaction } = useMutation(mutateService('post', 'feedback:/v1/reactions'));
  function handleToggleReaction() {
    if (!isAction) return;
    mutateReaction({
      body: {
        modelId: props.modelId,
        modelTypeId: props.modelTypeId,
        type: props.type,
        delete: reactionData.userReacted,
      },
    }).then(() => {
      setReactionData(
        reactionData.userReacted
          ? { count: reactionData.count - 1, userReacted: false }
          : { count: reactionData.count + 1, userReacted: true },
      );
    });
  }

  return (
    <div
      className={clsx(
        'flex gap-2 items-center p-2 rounded-md',
        isAction && 'hover:bg-gray-200',
        reactionData.userReacted && 'text-primary',
      )}
      onClick={handleToggleReaction}
    >
      <Icon /> {reactionData.count}
    </div>
  );
}
