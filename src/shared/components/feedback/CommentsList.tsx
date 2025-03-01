import { queryService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { createFileUrl, formatDateTime, fromNow } from '@/utils';
import { ArrowBendUpLeft, CaretDown, CaretUp, FunnelSimple } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Reaction } from './Reaction';
import { ReportButton } from './Report';
import { SubmitComment } from './SubmitComment';

interface Props {
  // scopeId: number;
  modelTypeId: ModelType;
  modelId: number;
}

type Comment = Schema<'CommentResponseDTO'> & { userImage: string; feedbackStats?: Schema<'FeedbackStatsDTO'> };

const sortOptions = [/* 'popular,desc',  */ 'createdAt', 'createdAt,desc'] as const;

export function CommentsList(props: Props) {
  const [sort, setSort] = useState<string>(sortOptions[0]);
  const commentsData = useQuery(
    queryService('feedback:/v1/comments', {
      params: { query: { dto: { modelId: props.modelId, modelTypeId: props.modelTypeId }, ...{ sort: [sort] } } },
    })
  ).data;
  const comments = commentsData?.content!;
  const count = commentsData?.totalElements;
  return (
    <div className="p-6 pb-0 rounded-lg bg-white mt-10 flex flex-col">
      <h5 className="font-bold text-xl mb-4">دیدگاه ها</h5>
      <div className="flex items-center gap-1 text-xs font-semibold ">
        <p className="ml-auto">{count} دیدگاه برای این موضوع</p>
        <select className="not-styled cursor-pointer px-2 py-1" value={sort} onChange={(e) => setSort(e.target.value)}>
          {/* <option value={sortOptions[0]}>بر اساس محبوب ترین</option> */}
          <option value={sortOptions[0]}>بر اساس قدیمی ترین</option>
          <option value={sortOptions[1]}>بر اساس جدیدترین</option>
        </select>
        <FunnelSimple />
      </div>
      {comments.map((item) => (
        <VarComment key={item.id} item={item as any} {...props} />
      ))}
    </div>
  );
}

function Comment({ item }: { item: Comment }) {
  return (
    <div key={item.id} className="flex flex-col border-b border-gray-300 last:border-0 mb-3 pb-3">
      {/* username and detail container */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={createFileUrl(item.userImage, item.fileKey)} className="w-[40px] h-[40px] rounded-full" />
          <span>{item.userName}</span>
        </div>
        <time className="text-gray-500" dateTime={item.createdAt}>
          {formatDateTime(item.createdAt!)}
        </time>
      </div>
      <p className="my-3 whitespace-pre-wrap text-gray-500">{item.text}</p>

      {/* like container */}
      <div className="flex gap-8 self-end text-gray-500">
        {[ReactionType.LIKE, ReactionType.DISLIKE].map((type) => (
          <Reaction
            key={type}
            modelTypeId={ModelType.COMMENT}
            modelId={item.id!}
            reactions={item.reaction!}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

export default function VarComment({ item }: { item: Comment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isRepliesShown, setIsRepliesShown] = useState(false);

  const toggleReplies = () => {
    setIsRepliesShown(!isRepliesShown);
  };

  // Action buttons component
  const ActionButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
    <button className="flex items-center text-gray-500 hover:text-gray-700 mr-4" onClick={onClick}>
      <span className="ml-1 text-sm">{label}</span>
      {icon}
    </button>
  );

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      {/* Comment Header */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={createFileUrl(item.userImage, item.fileKey)}
          className="w-8 h-8 rounded-full mr-2"
          alt="user avatar"
        />
        <p className="text-varz">{item.userName}</p>
        {'-'}
        <time className="text-gray-500" dateTime={item.createdAt}>
          {fromNow(item.createdAt!)}
        </time>
        {'-'}
        <span className="text-gray-500">{item.feedbackStats?.commentCount} پاسخ</span>
      </div>

      {/* Comment Body */}
      <div className="mb-4 text-gray-800 text-sm leading-relaxed">
        پرسپولیس با اختلاف بهترین تیم ایران در ده سال گذشته بوده. تیمهای دیگه ایرانی (تاس) تو این مدت حتی یک بارم نتوستن
        تا نیمه نهایی آسیا برن، در حالیکه پرسپولیس ۲ فینال و ۲ نیمه نهایی رفته
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Reaction
            reactions={item.feedbackStats?.reaction}
            type={ReactionType.LIKE}
            modelTypeId={ModelType.NEWS}
            modelId={item.id!}
          />
          <Reaction
            reactions={item.feedbackStats?.reaction}
            type={ReactionType.DISLIKE}
            modelTypeId={ModelType.NEWS}
            modelId={item.id!}
          />
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 "
            onClick={() => setShowReplyInput(!showReplyInput)}
          >
            <span className="ml-1 text-sm">پاسخ</span>
            <ArrowBendUpLeft size={18} />
          </button>

          <ReportButton />
        </div>
      </div>
      {/* Reply Input */}
      <SubmitComment
        className={showReplyInput ? '' : 'hidden'}
        scopeId={item.scopeId}
        modelTypeId={ModelType.COMMENT}
        modelId={item.id!}
        small
      />
      {item.childrens && (
        <>
          <button onClick={toggleReplies} className="inline-flex items-center" type="button">
            <span className="flex items-center gap-2">
              {isRepliesShown ? 'مخفی کردن پاسخ‌ها' : 'مشاهده پاسخ‌ها'}
              {isRepliesShown ? <CaretUp /> : <CaretDown />}
            </span>
          </button>
          <div>
            {item.childrens.map((innerItem: typeof item) => (
              <VarComment item={innerItem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
