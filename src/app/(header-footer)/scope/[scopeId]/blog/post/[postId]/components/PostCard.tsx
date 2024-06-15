import { formatDateTime } from '@/utils';
import { AuthorInfo } from '../../../(landing)/components/AuthorInfo';
import { BlogPostMock } from '../../../mocks';

interface Props {
  post: BlogPostMock;
}

export function PostCard(props: Props) {
  const post = props.post;

  return (
    <div className="card rounded-lg card-body flex flex-col gap-4">
      <img className="w-full" src={post.coverImage} alt={post.title} />
      <p className="card-title">{post.title}</p>
      <div className="flex items-center gap-4">
        <AuthorInfo author={post.author} />
        <time dateTime={post.createAt}>{formatDateTime(post.createAt!)}</time>
      </div>
    </div>
  );
}
