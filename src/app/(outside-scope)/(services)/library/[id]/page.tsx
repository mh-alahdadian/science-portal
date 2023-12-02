export default function News({ params }: PageProps<'id'>) {
  return (
    <div>
      کتابخانه
      {params.id}
    </div>
  );
}
