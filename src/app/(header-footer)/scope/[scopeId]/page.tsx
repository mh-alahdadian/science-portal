'use client';

import { useCurrentScope } from '@/hooks';

export default function HomePage({ params }: PageProps<'scopeId'>) {
  const scope = useCurrentScope();
  return <div className="flex flex-col gap-5  max-w-xs w-full">Hello From Scope {scope.title}</div>;
}
