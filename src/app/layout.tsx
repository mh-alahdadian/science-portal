'use client';

import Providers from '@/Providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import 'vazirmatn/Vazirmatn-font-face.css';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const myTheme = params.scopeId ? 'dark' : 'light';

  return (
    <html lang="en" dir="rtl" data-theme={myTheme} data-bs-theme={myTheme}>
      <body className={clsx('flex flex-col')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
