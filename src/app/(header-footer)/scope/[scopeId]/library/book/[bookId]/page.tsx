'use client';

import { mutateService, queryService } from '@/api';
import { Breadcrumb, Rating, RatingChart } from '@/components';
import { CommentsList, SubmitComment } from '@/components/feedback';
import { ModelType } from '@/constants';
import { createFileUrl } from '@/utils';
import { Download, Share, Star } from '@phosphor-icons/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SimilarBooks } from './SimilarBooks';

type BookDTO = Schema<'BookResponseDTO'>;

const mockImage = `https://api.slingacademy.com/public/sample-photos/1.jpeg`;

const mockBook: BookDTO = {
  id: 2,
  name: 'عنوان تاپیک که یه تایتل برای تایپک توسط کاربر نوشته شده است',
  description: `
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
  <p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
`,
  createAt: new Date().toString(),
};

const mockRating = { count: 128, score: 3.7, details: { 1: 7, 2: 12, 3: 84, 4: 20, 5: 5 } };
function authorName(a: Schema<'AuthorDTO'>) {
  return (a.firstName + ' ' + a.lastName).toLocaleString();
}
export default function BookPage(props: PageProps<'scopeId' | 'bookId'>) {
  const { params } = props;
  const book = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books/{bookId}', { params: { path: params } }),
  ).data;

  const { mutateAsync: voteRating } = useMutation(mutateService('post', 'feedback:/v1/reactions'));
  function handleVoteRating() {
    voteRating({ body: { score: myRating, modelId: book.id!, modelTypeId: ModelType.BOOK } as any });
  }

  const [myRating, setMyRating] = useState<number>(0);

  const rating = { ...mockRating, ...(book.feedbackStats as any)?.rating };

  const bookInfo = (
    <div className="card flex-row gap-4">
      <img
        src={mockImage || createFileUrl(book.coverImage)}
        alt={book.name!}
        width={200}
        className="object-contain object-top"
      />
      <div className="flex-1 space-y-4">
        <h1 className="font-bold text-2xl">{book.name}</h1>
        {[
          ['نویسنده', book.authors?.map(authorName)],
          ['مترجم', book.authors?.map(authorName)],
          ['سال انتشار', book.publicationYear],
          ['زبان', 'فارسی'],
          ['نوع فایل', 'PDF'],
          ['تعداد دانلود', 5700 + 'بار'],
        ].map(([name, value], index) => (
          <p key={index}>
            <span className="me-2 opacity-50">{name}:</span>
            <span>{value}</span>
          </p>
        ))}
        <div className="actions flex gap-4">
          <button className="btn btn-primary flex-1">
            <Download />
            دانلود کتاب
          </button>
          <button className="btn btn-neutral">
            <Share />
            به اشتراک گذاری
          </button>
        </div>
      </div>
    </div>
  );

  const bookDescription = <div className="card">{book.description}</div>;
  const bookRating = (
    <div className="flex flex-col gap-4">
      <p>
        <Star className="text-warning" weight="fill" /> {rating.score} ({rating.count})
      </p>
      <RatingChart values={rating.details} total={rating.count} />
    </div>
  );
  const myScore = (
    <div className="card card-body">
      <div className="card-title">امتیاز</div>
      <div className="flex justify-between">
        <Rating value={myRating} onChange={setMyRating} />
        <button className="btn btn-primary" onClick={handleVoteRating}>
          ثبت امتیاز
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      <Breadcrumb
        items={[
          { text: 'حوزه', url: '../..' },
          { text: 'کتابخانه', url: '../' + book.category!.id },
          { text: book.name! },
        ]}
      />
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-12">
          {bookInfo}
          {bookDescription}
          {myScore}
          <SubmitComment modelTypeId={ModelType.BOOK} modelId={params.bookId} scopeId={params.scopeId} />
          <CommentsList modelTypeId={ModelType.BOOK} modelId={props.params.bookId} />
        </div>
        <aside className="max-w-xs flex-1 text-sm">
          {bookRating}
          <SimilarBooks {...props} tags={(book as any).tags?.map((t: any) => t.id)} />
        </aside>
      </div>
    </div>
  );
}
