import Link from 'next/link';

interface Props {
  scope: Schema<'ScopeDTO'>;
}

export default function ScopeCard({ scope }: Props) {
  return (
    <Link href={`/scope/${scope.id}`} className="card card-body flex flex-col gap-5 h-48">
      {scope.title}
    </Link>
  );
}
