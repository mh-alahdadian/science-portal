import { TextIcon } from '@/components/TextIcon';
import { formatDateTime } from '@/utils';
import { CaretLeft, ChatTeardropDots, Eye, ThumbsDown, ThumbsUp } from '@phosphor-icons/react';
import humanFormat from 'human-format';
import Link from 'next/link';
import { BlogPostMock } from '../../mocks';
import { AuthorInfo } from './AuthorInfo';

interface Props {
  post: BlogPostMock;
}

export function PostCard(props: Props) {
  const post = props.post;
  // @ts-ignore
  post.author = { id: post.authorId, name: post.authorName };

  return (
    <div className="card rounded-lg card-body flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <AuthorInfo author={post.author} />
        <time dateTime={post.createAt}>{formatDateTime(post.createAt!)}</time>
      </div>
      <img className="w-full" src={post.coverImage} alt={post.title} />
      <p className="card-title">{post.title}</p>
      <div className="flex gap-6 items-center">
        <TextIcon Icon={Eye} text={humanFormat(post.view || 0)} />
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
