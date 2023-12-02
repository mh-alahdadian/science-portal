export default function News({ params }: PageProps<'id'>) {
  return (
    <div>
      وبلاگ
      {params.id}
    </div>
  );
}
