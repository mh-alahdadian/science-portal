export default function News({ params }: PageProps<'id'>) {
  return (
    <div>
      انجمن
      {params.id}
    </div>
  );
}
