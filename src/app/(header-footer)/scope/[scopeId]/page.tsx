'use client';

import Link from 'next/link';
import { use } from 'react';

import { useCurrentScope } from '@/hooks';
import { Book, ChatsCircle, Rss } from '@phosphor-icons/react';

export default function HomePage(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const scope = useCurrentScope();
  return (
    <div className="flex flex-col items-center gap-5 h-full w-full">
      <h1 className="mt-12 prose-2xl">به حوزه پژوهشی {scope.title} خوش آمدید</h1>
      <h2 className="prose-xl">از خدمات زیر در این حوزه میتوانید بهره مند شوید</h2>

      <div className="flex gap-6">
        <Link href={params.scopeId + '/news'} className="card card-body bg-accent">
          <Rss size={48} />
          خبرگزاری
        </Link>
        <Link href={params.scopeId + '/forum'} className="card card-body bg-accent">
          <ChatsCircle size={48} />
          انجمن
        </Link>
        <Link href={params.scopeId + '/library'} className="card card-body bg-accent">
          <Book size={48} />
          کتابخانه
        </Link>
      </div>
    </div>
  );
}
