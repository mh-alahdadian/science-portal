'use client';

import { queryService } from '@/api';
import { TextIcon } from '@/components';
import { ChatTeardropDots, ReadCvLogo, ThumbsUp, User, UserPlus } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BlogPostMock, mockPosts } from '../../../mocks';

export default function BlogPostSidebar({ params }: PageProps<'scopeId'>) {
  const post: BlogPostMock = useSuspenseQuery({
    ...queryService('article:/v1/scope/{scopeId}/post/{postId}' as any, { params: { path: params } }),
    queryFn: () => mockPosts().content![0],
  }).data;

  return (
    <>
      <div className="card gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar placeholder">
            <div className="w-20 rounded-full">
              <img src={post.author.avatar} alt="test image" />
            </div>
          </div>
          <p>{post.author.name}</p>
        </div>
        <button className="btn-primary">
          <UserPlus />
          دنبال کردن
        </button>
        {[
          { key: 'تعداد دنبال کننده', value: post.author.followersCount, icon: User },
          { key: 'مقالات نوشته شده', value: post.author.postCount, icon: ReadCvLogo },
          { key: 'محبوبیت محتوا', value: post.author.feedbackStats.likesCount, icon: ThumbsUp },
          { key: 'دیدگاه‌ها در محتوا', value: post.author.feedbackStats.commentCount, icon: ChatTeardropDots },
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center">
            {item.key}
            <TextIcon Icon={item.icon} text={item.value} />
          </div>
        ))}
      </div>
    </>
  );
}
