'use client';

import { Drawer } from '@/components';
import { useScreen } from '@/hooks/screen';
import { List } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from 'src/assets/logo.svg';
import ManagementMenu from './ManagementMenuController';
import AuthDialogController from './ProfileMenuController';
import Services from './Services';
import { HeaderProps } from './types';

export default function Header() {
  const { isSmall } = useScreen();

  const [empty, scope, scopeId, service] = usePathname().split('/');
  const params = { scopeId: +scopeId, service } as HeaderProps;

  const logo = (
    <Link href="/">
      <div className="text-2xl ml-2 text-white">Cognitive</div>
      <Logo />
    </Link>
  );
  const navbar = isSmall ? (
    <Drawer openElement={<List />}>
      <Link href="/scopes" role="button" className="btn-ghost text-white">
        حوزه‌های پژوهشی
      </Link>
      <Services {...params} />
      <ManagementMenu {...params} />
    </Drawer>
  ) : (
    <div className="flex ml-auto">
      <Link href="/scopes" role="button" className="btn-ghost text-white">
        حوزه‌های پژوهشی
      </Link>
      <Services {...params} />
      <ManagementMenu {...params} />
    </div>
  );

  return (
    <header className="navbar max-md:justify-between sticky px-2 md:px-6 lg:px-12 z-10 bg-[teal]">
      {isSmall ? (
        <>
          {navbar}
          {logo}
        </>
      ) : (
        <>
          {logo}
          {navbar}
        </>
      )}
      <AuthDialogController />
    </header>
  );
}
