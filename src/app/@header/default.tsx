'use client';

import { Drawer } from '@/components';
import { useScreen } from '@/hooks/screen';
import { List } from '@phosphor-icons/react';
import Link from 'next/link';
import Logo from 'src/assets/logo.svg';
import ManagementMenu from './ManagementMenuController';
import AuthDialogController from './ProfileMenuController';
import Services from './Services';
import { Service } from '@/constants';

export default function Header({ params }: PageProps<'scopeId' | 'service'>) {
  const { isSmall } = useScreen();
  const service = params.service as Service | undefined;

  const logo = (
    <Link href="/">
      <div className="text-2xl ml-2">Cognitive</div>
      <Logo />
    </Link>
  );
  const navbar = isSmall ? (
    <Drawer openElement={<List />}>
      <Link href="/scopes" role="button" className="btn-link">
        حوزه‌ها
      </Link>
      <Services scopeId={params.scopeId} />
      <ManagementMenu service={service} scopeId={+params.scopeId} />
    </Drawer>
  ) : (
    <div className="flex ml-auto">
      <Link href="/scopes" role="button" className="btn-link">
        حوزه‌ها
      </Link>
      <Services scopeId={params.scopeId} />
      <ManagementMenu service={service} scopeId={+params.scopeId} />
    </div>
  );

  return (
    <header className="navbar max-md:justify-between sticky px-2 md:px-6 lg:px-12 z-10">
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
