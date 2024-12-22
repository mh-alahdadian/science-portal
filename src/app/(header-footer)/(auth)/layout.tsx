'use client';

import { useProfile } from '@/hooks';
import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import LoginIllustration from './assets/Login-Illustration.svg';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const profile = useProfile({ throwOnError: false, retry: 0 });
  const router = useRouter();

  useEffect(() => {
    if (profile) router.push('/');
  }, [profile]);

  return (
    <div className="w-full h-full flex-col">
      <Link href="/" role="button" className="btn-transparent my-8 col-span-full justify-self-start">
        <CaretRight />
        <span className="text-lg font-medium">بازگشت به خانه</span>
      </Link>
      <div className="flex items-center gap-12">
        <div className="gap-6 md:w-full md:max-w-xl h-fit bg-white card-body ">{children}</div>
        <LoginIllustration className="w-full max-md:hidden" />
      </div>
    </div>
  );
}
