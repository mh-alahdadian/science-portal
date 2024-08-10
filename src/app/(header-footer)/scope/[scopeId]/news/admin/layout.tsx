'use client';

import { ChatsCircle, NewspaperClipping } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NewsAdminLayout({ children, params }: LayoutProps & PageProps<'scopeId'>) {
  const selectedSegment = useSelectedLayoutSegment();
  const prefixRoute = selectedSegment === null ? 'admin/' : '';

  return (
    <div className="max-w-screen-2xl mx-auto ">
      {/* sidebar */}
      <div
        className={`group w-12 hover:w-28 bg-white z-20 duration-200 hover:duration-200 border-l-2 mt-16 flex flex-col justify-center h-[90vh] gap-6 fixed top-0 right-0`}
      >
        <Link href={`${prefixRoute}posts`}>
          <div className={` ${selectedSegment === 'posts' ? 'bg-green-500 rounded-md' : ''}`}>
            <NewspaperClipping size={64} width="100%" />
            <span className="hidden text-center group-hover:block">پست ها</span>
          </div>
        </Link>

        <Link href={`${prefixRoute}categories`}>
          <div className={` ${selectedSegment === 'categories' ? 'bg-green-500 rounded-md' : ''}`}>
            <ChatsCircle size={64} width="100%" />
            <span className="hidden text-center group-hover:block">دسته ها</span>
          </div>
        </Link>
      </div>

      {/* main */}
      <div className="w-full">
        <div className="pr-10 py-8">{children}</div>
      </div>
    </div>
  );
}
