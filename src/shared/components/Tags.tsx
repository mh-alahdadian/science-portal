import clsx from 'clsx';

interface Props {
  variant?: 'varzesh3';
  tags: Schema<'TagEntity'>[];
}

export function Tags({ tags, variant }: Props) {
  return (
    <div className={clsx('mt-4 flex gap-2')}>
      {tags.map((tag) => (
        <div className={clsx(variant === 'varzesh3' ? 'tag-varzesh3' : 'badge bg-custom2-100')} key={tag.id}>
          {tag.title}
        </div>
      ))}
    </div>
  );
}
