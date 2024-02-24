'use client';

import Providers from '@/Providers';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { useParams } from 'next/navigation';
import 'vazirmatn/Vazirmatn-font-face.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const myTheme = params.scopeId ? 'dark' : 'light';

  return (
    <html lang="en" dir="rtl" data-theme={myTheme}>
      <body className={clsx('flex flex-col')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
