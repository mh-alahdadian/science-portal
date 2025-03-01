'use client';;
import { use } from "react";

import { useCurrentScope } from '@/hooks';

export default function News(props: PageProps<'scopeId' | 'id'>) {
  const params = use(props.params);
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
