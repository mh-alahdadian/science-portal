'use client';

import { queryService } from '@/api';
import { Drawer } from '@/components';
import { useCurrentScope, useProfile } from '@/hooks';
import { useScreen } from '@/hooks/screen';
import { getScopeUrl } from '@/utils';
import { CaretDown, List } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from 'src/assets/logo.svg';
import ManagementMenu from './ManagementMenuController';
import AuthDialogController from './ProfileMenuController';
import Services from './Services';
import { HeaderProps } from './types';

export default function Header() {
  const { isSmall } = useScreen();

  const [empty, _, scopeId, service] = usePathname().split('/');
  const scope = useCurrentScope();
  const params = { scopeId: +scopeId, service } as HeaderProps;
  const router = useRouter();
  const { data: scopes } = useQuery(queryService('core:/v1/scopes', {}));
  const profile = useProfile();

  function myScopes() {
    const set = new Set(profile ? profile.userRoles?.map((r) => r.scopeId!) : [0]);
    return (s: Schema<'ScopeDTO'>) => set.has(s.id!);
  }

  const logo = (
    <Link href="/">
      <div className="text-2xl ml-2 text-white">Cognitive</div>
      <Logo />
    </Link>
  );
  const scopeMenu = (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="bg-accent text-black mx-2">
        حوزه پژوهشی : {scope.title}
        <CaretDown />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-gray-100 text-black rounded-box w-full z-[1] p-2 shadow">
        {scopes?.filter(myScopes())?.map((s) => (
          <li>
            <Link href={`${getScopeUrl(s.id!)}/${service}`}>{s.title}</Link>
          </li>
        ))}
        <li>
          <Link href="/scopes" className="font-semibold">
            + سایر حوزه‌ها
          </Link>
        </li>
      </ul>
    </div>
  );

  const navbar = isSmall ? (
    <Drawer openElement={<List />}>
      {scopeMenu}
      <Services {...params} />
      <ManagementMenu {...params} />
    </Drawer>
  ) : (
    /* 
    <div className="flex ml-auto mr-4">
      {scopeMenu}
      <div className="h-2">
        <Services {...params} />
        <ManagementMenu {...params} />
      </div>
    </div>
    */
    <>
      <div className="flex ml-auto mr-4">
        <div className="h-2">
          <Services {...params} />
        </div>
      </div>
      <ManagementMenu {...params} />
      {scopeMenu}
    </>
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
