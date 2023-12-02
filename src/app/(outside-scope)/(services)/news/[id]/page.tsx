export default function News({ params }: PageProps<'id'>) {
  return (
    <div>
      اخبار
      {params.id}
    </div>
  );
}
