'use client';;
import { use } from "react";

import { Breadcrumb } from '@/components';

export default function BlogLandingSidebar(props: LayoutProps<'side'> & PageProps<'scopeId'>) {
  const params = use(props.params);
  return (<>
    <Breadcrumb params={params} items={[{ text: 'بلاگ' }]} />
    <div className="flex gap-6">
      <div className="flex-1 flex flex-col gap-12">{children}</div>
      <aside className="max-w-xs flex-1 text-sm">{side}</aside>
    </div>
  </>);
}
