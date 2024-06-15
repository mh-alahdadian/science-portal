'use client';

import { Breadcrumb } from '@/components';

export default function BlogLandingSidebar(props: LayoutProps<'side'> & PageProps<'scopeId'>) {
  return (
    <>
      <Breadcrumb params={props.params} items={[{ text: 'بلاگ' }]} />
      <div className="flex gap-6">
        <div>float</div>
        <div className="flex-1 flex flex-col gap-6">{props.children}</div>
        <aside className="max-w-xs flex-1 text-sm">{props.side}</aside>
      </div>
    </>
  );
}
