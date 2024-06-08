import { TextIcon } from '@/components/TextIcon';
import { formatDateTime } from '@/utils';
import { CaretLeft, ChatTeardropDots, Eye, ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import humanFormat from 'human-format';
import Link from 'next/link';
import { AuthorInfo } from './AuthorInfo';

interface Props {
  post: Schema<'ArticleResponseDTO'>;
}

const mockImage =
  'https://s3-alpha-sig.figma.com/img/843c/c79a/0258258620eda444731c25cad9a19ee4?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HWQyuI5O~mQ240wiOjPuPVy~8qrWh~m9pF9KBiAC~Ya5JpdWEzaNoqZju2gX2tmLnOmxyBlAK1BFn-dKcoVoRfSbDpowyTurIUlnRNrEeqnT2p7bi3ho9NP-gUk5ZabQ-dpzvadcjhxDTlGqACjmnwhvZ9ezrR2V3WXPVLjtQNDQKICTSsjV8HnEBn3~6lSWqvw26dinlSs7ZHNa0QNmkyYNVbg2boJZS-ixI4Xm6Qz3auj5gHxDFm0mn8L1K5FijYEhHg9RnW0NeOHxrRV-XszT6gdpEpad2XUrCRW1suirKdFL1A6F6VOqFAZYHKtFbuqo8LPsC2cDhiXJiNlarA__';
const mockAvatar =
  'https://s3-alpha-sig.figma.com/img/4238/f09b/014d0324fec8ef01c81b8b79303c6e40?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qJsE9ixprpb1Vzrv03jVb~vda2fGNlDdYONBb3y2U3CW3FwMPXtxnEg8axjgeny6k8tfu0cN6gBNJxqktbO7AZUCZvNs38JQ31sJ6WDR0eqLI3iwoavrXZslGyhlCuxjBHT1YWeb0P8OUoeaC2d7hP75KKwMRiSrNRkuQWCHQli0R1jJ6qzzn8Gtak~9Jdh8AX4rH5eXKT5Te3BLvSY4iYZG8bAUEAZ7YUbhhFVJ8R4jRXdmenF-rS7wPzi7S6BiMrwretSuNqMiqE52PP08a2YPdFm1z3pjITdV1gki1ekpvGxCaTh9pN5q3Zojs7c94Qvpo-LIdxsAc4DTIsxdng__';

interface Mock extends Schema<'ArticleResponseDTO'> {
  views: number;
}

export function PostCard(props: Props) {
  const post = props.post as Mock;

  return (
    <div className="card rounded-lg card-body flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <AuthorInfo author={{ id: post.authorId, name: post.authorName, avatar: mockAvatar }} />
        <time dateTime={post.createAt}>{formatDateTime(post.createAt!)}</time>
      </div>
      <img className="w-full" src={post.coverImage || mockImage} alt={post.title} />
      <p className="card-title">{post.title}</p>
      <div className="flex gap-6 items-center">
        <TextIcon Icon={Eye} text={humanFormat(post.views || 0)} />
        <TextIcon Icon={ThumbsUp} text={humanFormat(post.feedbackStats?.reaction?.[0]?.count || 0)} />
        <TextIcon Icon={ThumbsDown} text={humanFormat(post.feedbackStats?.reaction?.[1]?.count || 0)} />
        <TextIcon Icon={ChatTeardropDots} text={humanFormat(post.feedbackStats?.commentCount || 0)} />
        <Link className="btn btn-link btn-primary ms-auto" href={`blog/post/${post.id}`}>
          مشاهده بیشتر
          <CaretLeft />
        </Link>
      </div>
    </div>
  );
}
