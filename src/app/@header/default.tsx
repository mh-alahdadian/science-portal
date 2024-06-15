import Link from 'next/link';
import Logo from 'src/assets/logo.svg';
import AuthDialogController from './ProfileMenuController';
import Services from './Services';
import ManagementMenu from './ManagementMenuController';

export default function Header({ params }: PageProps<'scopeId'>) {
  return (
    <header className="navbar sticky px-12">
      <Link href="/">
        <div className="text-2xl ml-2">Cognitive</div>
        <Logo />
      </Link>
      <div className="flex ml-auto">
        <Link href="/scopes" className="btn btn-link">
          حوزه‌ها
        </Link>
        <Services scopeId={params.scopeId} />
        <ManagementMenu scopeId={+params.scopeId}/>
      </div>
      <AuthDialogController />
    </header>
  );
}
