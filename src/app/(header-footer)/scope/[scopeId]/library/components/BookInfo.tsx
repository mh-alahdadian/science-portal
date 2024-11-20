import { Star } from '@phosphor-icons/react';

type BookDTO = Schema<'BookResponseDTO'>;

interface Props {
  book: BookDTO;
  //   href: string;
  //   variant: 'vertical' | 'horizontal';
}

export function BookInfo(props: Props) {
  const { book } = props;
  const rating = book.feedbackStats!.rating! || {};
  return (
    <div className="w-full">
      <p className="card-title">{book.name}</p>
      <p>{book.authors?.map((x) => `${x.firstName} ${x.lastName}`)}</p>
      <p className="">
        <Star className="text-warning" weight="fill" /> {rating.average} ({rating.total})
      </p>
    </div>
  );
}
