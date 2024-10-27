'use client';;
import { use } from "react";

import { useCurrentScope } from '@/hooks';
// import { Books, Megaphone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function HomePage(props: PageProps<'scopeId'>) {
  const params = use(props.params);
  const scope = useCurrentScope();
  return (
    <div className="flex flex-col items-center gap-5 h-full w-full">
      <h1 className="mt-12 prose-2xl">به حوزه پژوهشی {scope.title} خوش آمدید</h1>
      <h2 className="prose-xl">از خدمات زیر در این حوزه میتوانید بهره مند شوید</h2>

      <div className="flex gap-6">
        <Link href={params.scopeId + '/news'} className="card card-body bg-accent">
          {/* <Megaphone /> */}
          خبرگزاری
        </Link>
        <div
          // href={params.scopeId + '/library'}
          className="card card-body bg-accent opacity-50 disabled cursor-not-allowed"
        >
          {/* <Books /> */}
          کتابخانه
        </div>
      </div>
    </div>
  );
}
