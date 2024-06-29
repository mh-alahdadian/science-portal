'use client';

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
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        <List />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <Link href="/scopes" className="btn btn-link">
          حوزه‌ها
        </Link>
        <Services scopeId={params.scopeId} />
        <ManagementMenu scopeId={+params.scopeId} />
      </ul>
    </div>
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
    <header className="navbar max-md:justify-between sticky px-12">
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
