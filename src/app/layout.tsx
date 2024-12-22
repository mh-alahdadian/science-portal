'use client';

import Providers from '@/Providers';
import { useThemeName } from '@/utils/scope';
import clsx from 'clsx';
import 'vazirmatn/Vazirmatn-font-face.css';
// import './bootstrap.scss';
import './globals.css';
import { Footer } from './Footer';

export default function RootLayout({ children, header }: LayoutProps<'header'>) {
  const myTheme = useThemeName();

  return (
    <html lang="en" className="d-styled" dir="rtl" data-theme={myTheme} data-bs-theme={myTheme}>
      <body className={clsx('flex flex-col')}>
        <Providers>
          {header}
          <main className="flex-1">{children}</main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
