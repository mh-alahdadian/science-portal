import { Card } from '@mui/material';
import Link from 'next/link';

interface Props {
  scope: Schema<'ScopeDTO'>;
}

export default function ScopeCard({ scope }: Props) {
  return <Card component={Link} href={`/scope/${scope.id}`} className="flex flex-col gap-5 h-48">{scope.title}</Card>;
}
