'use client';

import { queryService } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import ScopeCard from './ScopeCard';

const placeholder: Schema<'ScopeDTO'>[] = [
  { id: 1, title: 'mock 1', enable: true },
  { id: 2, title: 'mock 2', enable: true },
  { id: 3, title: 'mock 3', enable: true },
  { id: 4, title: 'mock 4', enable: true },
];

export default function ScopesPage(props: PageProps) {
  const { data } = useSuspenseQuery(queryService('core:/v1/scopes', {}));
  return (
    <div className="flex flex-col gap-5 w-full">
      Scopes:
      <div className="grid gap-4 grid-cols-3">
        {data.map((x: any) => (
          <ScopeCard key={x.id} scope={x} />
        ))}
      </div>
    </div>
  );
}
