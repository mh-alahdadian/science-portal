'use client';

import { useCurrentScope } from "@/hooks";

export default function News({ params }: PageProps<'id'>) {
  const scope = useCurrentScope()
  return (
    <div>
      وبلاگ
      {params.id}
      برای اسکوپ
      {scope.title}
    </div>
  );
}
