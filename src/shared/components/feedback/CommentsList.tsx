import { queryService } from '@/api';
import { ModelType, ReactionType } from '@/constants';
import { createFileUrl, formatDateTime, fromNow } from '@/utils';
import { FunnelSimple } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Reaction } from './Reaction';

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
        <VarComment key={item.id} item={item as any} />
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [replyText, setReplyText] = useState('');

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
      <div className="flex items-center mb-2">
        <img
          src={createFileUrl(item.userImage, item.fileKey)}
          className="w-8 h-8 rounded-full mr-2"
          alt="user avatar"
        />
        <p>{item.userName}</p>
        <div className="flex items-center text-sm">
          <time className="text-gray-500" dateTime={item.createdAt}>
            {fromNow(item.createdAt!)}
          </time>
          <span>{item.feedbackStats?.commentCount} پاسخ</span>
        </div>
      </div>

      {/* Comment Body */}
      <div className="mb-4 text-gray-800 text-sm leading-relaxed">
        پرسپولیس با اختلاف بهترین تیم ایران در ده سال گذشته بوده. تیمهای دیگه ایرانی (تاس) تو این مدت حتی یک بارم نتوستن
        تا نیمه نهایی آسیا برن، در حالیکه پرسپولیس ۲ فینال و ۲ نیمه نهایی رفته
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ActionButton
            label="0"
            onClick={() => {}}
            icon={
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1V9z"
                />
              </svg>
            }
          />

          <ActionButton
            label="0"
            onClick={() => {}}
            icon={
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v-2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4V3z"
                />
              </svg>
            }
          />

          <ActionButton
            label="پاسخ"
            onClick={() => setShowReplyInput(!showReplyInput)}
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
              </svg>
            }
          />

          <ActionButton
            label="گزارش تخلف"
            onClick={() => setShowReportModal(true)}
            icon={
              <svg className="w-4 h-4" viewBox="0 0 20 17">
                <path d="M10,3.57 L16.8454545,15.2105263 L3.15454545,15.2105263 L10,3.57 M10,0 L0,17 L20,17 L10,0 Z M10.9090909,12.5263158 L9.09090909,12.5263158 L9.09090909,14.3157895 L10.9090909,14.3157895 L10.9090909,12.5263158 Z M10.9090909,7.15789474 L9.09090909,7.15789474 L9.09090909,10.7368421 L10.9090909,10.7368421 L10.9090909,7.15789474 Z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="دیدگاه خود را بنویسید"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            ارسال
          </button>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">گزارش تخلف</h2>
            <p className="mb-4">
              آیا از گزارش تخلف برای کاربر "<b>شیشتقلالی منتظر</b>" برای ثبت نظر "
              <b>پرسپولیس با اختلاف بهترین تیم ایران در ده سال گذشته بوده...</b>" مطمئن هستید؟
            </p>

            <form>
              <label className="block mb-2 font-medium">نوع تخلف</label>
              <select className="w-full p-2 border rounded mb-4">
                <option value="7">توهین</option>
                <option value="8">سیاسی</option>
                <option value="9">اسپم</option>
                <option value="10">کلمات رکیک</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  خیر منصرف شدم
                </button>
                <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  بله مطمئنم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
