'use client';

import { Drawer } from '@/components';
import { useScreen } from '@/hooks/screen';
import { List } from '@phosphor-icons/react';
import Link from 'next/link';
import Logo from 'src/assets/logo.svg';
import ManagementMenu from './ManagementMenuController';
import AuthDialogController from './ProfileMenuController';
import Services from './Services';

export default function Header({ params }: PageProps<'scopeId'>) {
  const { isSmall } = useScreen();

  const logo = (
    <Link href="/">
      <div className="text-2xl ml-2">Cognitive</div>
      <Logo />
    </Link>
  );
  const navbar = isSmall ? (
    <Drawer openElement={<List />}>
      <Link href="/scopes" className="btn btn-link">
        حوزه‌ها
      </Link>
      <Services scopeId={params.scopeId} />
      <ManagementMenu scopeId={+params.scopeId} />
    </Drawer>
  ) : (
    <div className="flex ml-auto">
      <Link href="/scopes" className="btn btn-link">
        حوزه‌ها
      </Link>
      <Services scopeId={params.scopeId} />
      <ManagementMenu scopeId={+params.scopeId} />
    </div>
  );

  return (
    <header className="navbar max-md:justify-between sticky px-2 md:px-6 lg:px-12">
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
