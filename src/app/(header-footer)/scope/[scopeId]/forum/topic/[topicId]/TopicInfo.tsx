import { queryService } from '@/api';
import { CaretLeft } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface Props {
  scopeId: number;
  topic: Schema<'TopicResponseDTO'>;
}

export function TopicInfo(props: Props) {
  const { topic, scopeId } = props;
  const x = topic.tags?.map((t) => t.id);

  const relatedTopics = useSuspenseQuery(
    queryService('forum:/v1/scope/{scopeId}/topics', {
      params: { path: { scopeId }, query: { pageable: { size: 4 }, tags: topic.tags?.map((t) => t.id) } as any },
    })
  ).data.content!;

  return (
    <aside className="max-w-xs flex-1 text-sm">
      <div className="text-black text-opacity-50">
        {[
          { key: 'دسته بندی', value: topic.categoryId },
          { key: 'پاسخ‌ها', value: 106 },
          // { key: 'بازدید', value: '' },
          { key: 'آخرین تاریخ فعالیت', value: topic.lastActivity || topic.createdAt },
        ].map((row, i) => (
          <div key={i} className="flex justify-between">
            <span>{row.key}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <span className="text-black text-opacity-50">تایپک های مرتبط</span>
        {relatedTopics.map((t) => (
          <Link key={t.id} href={`${topic.id}`} className="flex justify-between">
            <p>{t.title}</p>
            <CaretLeft />
          </Link>
        ))}
      </div>
    </aside>
  );
}
