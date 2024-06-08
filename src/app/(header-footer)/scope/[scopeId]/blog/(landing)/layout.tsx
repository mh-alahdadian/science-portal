'use client';

import { Breadcrumb } from '@/components';
import { useCurrentScope } from '@/hooks';

export default function BlogLandingSidebar(props: LayoutProps<'side'> & PageProps<'scopeId'>) {
  const scope = useCurrentScope();

  return (
    <>
      <Breadcrumb
        items={[
          { text: 'صفحه اصلی', url: '/' },
          { text: 'حوزه ' + scope.title, url: '/scope/' + props.params.scopeId },
          { text: 'بلاگ' },
        ]}
      />
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-12">{props.children}</div>
        <aside className="max-w-xs flex-1 text-sm">{props.side}</aside>
      </div>
    </>
  );
}
