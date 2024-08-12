'use client';

import { ChartLine, ChatsCircle, NewspaperClipping } from '@phosphor-icons/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NewsAdminLayout({ children, params }: LayoutProps & PageProps<'scopeId'>) {
  const selectedSegment = useSelectedLayoutSegment();
  const prefixRoute = selectedSegment === null ? 'admin/' : '';

  return (
    <div className="max-w-7xl mx-auto ">
      {/* sidebar */}
      <div
        className={`group w-12 hover:w-28 bg-white z-20 duration-200 hover:duration-200 border-l-2 mt-16 flex flex-col justify-center h-[90vh] gap-6 fixed top-0 right-0`}
      >
        <Link href={`${prefixRoute}posts`}>
          <div className={`rounded-md ${selectedSegment === 'posts' ? 'bg-green-500' : 'hover:bg-green-200'}`}>
            <NewspaperClipping size={64} width="100%" />
            <span className="hidden text-center group-hover:block">پست ها</span>
          </div>
        </Link>

        <Link href={`${prefixRoute}categories`}>
          <div className={`rounded-md ${selectedSegment === 'categories' ? 'bg-green-500' : 'hover:bg-green-200'}`}>
            <ChatsCircle size={64} width="100%" />
            <span className="hidden text-center group-hover:block">دسته ها</span>
          </div>
        </Link>

        <Link href={`${prefixRoute}dashboard`}>
          <div className={`rounded-md ${selectedSegment === 'dashboard' ? 'bg-green-500' : 'hover:bg-green-200'}`}>
            <ChartLine size={64} width="100%" />
            <span className="hidden text-center group-hover:block">داشبورد</span>
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
