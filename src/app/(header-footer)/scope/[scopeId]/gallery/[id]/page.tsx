'use client';

import { useCurrentScope } from '@/hooks';

export default function News({ params }: PageProps<'scopeId' | 'id'>) {
  const scope = useCurrentScope();
  return (
    <div>
      گالری
      {params.id}
      برای اسکوپ
      {scope.title}
    </div>
  );
}
