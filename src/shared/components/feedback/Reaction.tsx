import { mutateService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { Heart, ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  type: ReactionType;
  reactions: SchemaOf<'feedback', 'FeedbackStatsDTO'>['reaction'];
} & ({ modelTypeId: ModelType; modelId: number } | { modelTypeId?: undefined; modelId?: undefined });

const IconMap = {
  [ReactionType.HEART]: Heart,
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
        type: props.type as any,
        delete: reactionData.userReacted,
      },
    }).then(() => {
      setReactionData(
        reactionData.userReacted
          ? { count: reactionData.count - 1, userReacted: false }
          : { count: reactionData.count + 1, userReacted: true }
      );
    });
  }

  return (
    <div
      className={clsx(
        'flex gap-1 items-center px-3 py-1.5 bg-[#f5f7f8] rounded-md',
        isAction && 'hover:bg-gray-200 cursor-pointer',
        reactionData.userReacted && 'text-primary'
      )}
      onClick={handleToggleReaction}
    >
      <Icon size={18} /> {reactionData.count}
    </div>
  );
}

type ReactionsProps = Omit<Props, 'type'> & { types: Props['type'][]; className?: string };

export function Reactions({ className, types, ...rest }: ReactionsProps) {
  return (
    <div className={clsx('flex gap-6', className)}>
      {types.map((type) => (
        <Reaction key={type} type={type} {...(rest as any)} />
      ))}
    </div>
  );
}
