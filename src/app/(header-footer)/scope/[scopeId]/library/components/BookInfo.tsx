import { Star } from '@phosphor-icons/react';

type BookDTO = Schema<'BookResponseDTO'>;

interface Props {
  book: BookDTO;
  //   href: string;
  //   variant: 'vertical' | 'horizontal';
}

export function BookInfo(props: Props) {
  const { book } = props;
  return (
    <div className="w-full">
      <p className="card-title">{book.name}</p>
      <p>{book.authors?.map((x) => `${x.firstName} ${x.lastName}`)}</p>
      <p className="">
        <Star className="text-warning" weight="fill" /> {307} ({1200})
      </p>
    </div>
  );
}
