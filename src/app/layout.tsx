'use client';

import Providers from '@/Providers';
import { useThemeName } from '@/utils/scope';
import clsx from 'clsx';
import 'vazirmatn/Vazirmatn-font-face.css';
import './bootstrap.scss';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const myTheme = useThemeName();

  return (
    <html lang="en" dir="rtl" data-theme={myTheme} data-bs-theme={myTheme}>
      <body className={clsx('flex flex-col')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
