'use client';

import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import LoginIllustration from './assets/Login-Illustration.svg';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="container w-full h-full justify-between">
      <style jsx>{`
        .container {
          display: grid;
          grid-template: auto 1fr / 35% auto;
        }
      `}</style>
      <Link href="/" className="btn btn-transparent my-8 col-span-full justify-self-start ">
        <CaretRight />
        <span className="text-lg font-medium">بازگشت به خانه</span>
      </Link>
      <div className="gap-6 w-full h-fit bg-white card-body ">{children}</div>
      <LoginIllustration className="" />
    </div>
  );
}
