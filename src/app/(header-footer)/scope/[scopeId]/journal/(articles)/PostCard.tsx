import { Tags } from '@/components';
import { TextIcon } from '@/components/TextIcon';
import { CaretLeft, Download, Eye } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  post: Schema<'ArticleResponseDTO'>;
}

interface Mock extends Schema<'ArticleResponseDTO'> {
  language: string;
  pagesCount: number;
}

export function PostCard(props: Props) {
  const post = props.post as Mock;

  return (
    <div className="card w-1/2 rounded-lg card-body">
      <p className="card-title">{post.title}</p>
      <p>
        <span>نویسندگان:</span>
        <span className="ms-2">{post.authorName}</span>
      </p>
      <div className="flex gap-20">
        {[
          ['سال انتشار', post.publishAt || '۱۴۰۲'],
          ['تعداد صفحات', post.pagesCount || '۱۴'],
          ['زبان', post.language || 'فارسی'],
        ].map(([key, value]) => (
          <p key={key}>
            <span>{key}:</span>
            <span className="ms-2">{value}</span>
          </p>
        ))}
      </div>
      <Tags tags={(post as any).tags || []} />
      <div className="flex gap-6 items-center">
        <TextIcon Icon={Eye} text={700} />
        <TextIcon Icon={Download} text={5700} />
        <Link className="btn btn-link btn-primary ms-auto" href={`article/${post.id}`}>
          مشاهده و دانلود
          <CaretLeft />
        </Link>
      </div>
    </div>
  );
}
