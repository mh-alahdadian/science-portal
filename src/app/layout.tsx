'use client';

import Providers from '@/Providers';
import { useThemeName } from '@/utils/scope';
import clsx from 'clsx';
import 'vazirmatn/Vazirmatn-font-face.css';
// import './bootstrap.scss';
import { Footer } from './Footer';
import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children, header }: LayoutProps<'header'>) {
  const myTheme = useThemeName();

  const [empty, scope, scopeId, service] = usePathname().split('/');
  const bgColor = ['news'].includes(service) ? 'bg-white' : 'bg-[#f0f0f0]';
  
  return (
    <html lang="en" className="d-styled" dir="rtl" data-theme={myTheme} data-bs-theme={myTheme}>
      <body className={clsx('flex flex-col', bgColor)}>
        <Providers>
          {header}
          <main className="flex-1 grid">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
