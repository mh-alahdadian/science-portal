import { Tags } from '@/components';
import { TextIcon } from '@/components/TextIcon';
import { CaretLeft, Download, Eye } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  article: Schema<'ArticleResponseDTO'> & any;
}

export default function Article({ article }: Props) {
  return (
    <div className="card w-1/2 rounded-lg card-body">
      <p className="card-title">{article.title}</p>
      <p>
        <span>نویسندگان:</span>
        <span className="ms-2">{article.authorName}</span>
      </p>
      <div className="flex gap-20">
        {[
          ['سال انتشار', article.publishAt || '۱۴۰۲'],
          ['تعداد صفحات', article.pagesCount || '۱۴'],
          ['زبان', article.language || 'فارسی'],
        ].map(([key, value]) => (
          <p key={key}>
            <span>{key}:</span>
            <span className="ms-2">{value}</span>
          </p>
        ))}
      </div>
      <Tags tags={(article as any).tags || []} />
      <div className="flex gap-6 items-center">
        <TextIcon Icon={Eye} text={700} />
        <TextIcon Icon={Download} text={5700} />
        <Link role="button" className="btn-link btn-primary ms-auto" href={`article/${article.id}`}>
          مشاهده و دانلود
          <CaretLeft />
        </Link>
      </div>
    </div>
  );
}
