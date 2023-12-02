export default function News({ params }: PageProps<'id'>) {
  return (
    <div>
      گالری
      {params.id}
    </div>
  );
}
