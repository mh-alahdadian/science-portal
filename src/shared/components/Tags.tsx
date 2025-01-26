interface Props {
  tags: Schema<'TagEntity'>[];
}

export function Tags({ tags }: Props) {
  return (
    <div className="mt-4 flex gap-6">
      {tags.map((tag) => (
        <div className="badge bg-custom2-100" key={tag.id}>
          {tag.title}
        </div>
      ))}
    </div>
  );
}
