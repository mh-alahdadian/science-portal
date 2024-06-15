'use client';

import { ChatsCircle, NewspaperClipping } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NewsAdminLayout({ children, params }: LayoutProps & PageProps<'scopeId'>) {
  const selectedSegment = useSelectedLayoutSegment()
  const prefixRoute = selectedSegment === null ? 'admin/' : ''

  return (
    <div className="max-w-7xl mx-auto ">
      {/* sidebar */}
      <div className="basis-8 flex flex-col justify-center h-[90vh] gap-6 fixed top-0 right-0">
        <Link href={`${prefixRoute}posts`}>
          <ChatsCircle size={64} />
        </Link>

        <Link href={`${prefixRoute}categories`}>
          <NewspaperClipping size={64} />
        </Link>
      </div>

      {/* main */}
      <div className="w-full">
        <div className="pr-10">{children}</div>
      </div>
    </div>
  );
}
