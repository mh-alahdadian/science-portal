import { queryClient, queryService } from '@/api';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'src/assets/logo.png';
import { AuthDialogController } from './AuthDialogController';
import { ServiceMenu } from './ServiceMenu';

interface Props {}

interface Page {
  title: string;
  path: string;
}

const services: Page[] = [
  { title: 'اخبار', path: 'news' },
  { title: 'انجمن', path: 'forum' },
  { title: 'کتابخانه', path: 'library' },
  { title: 'وبلاگ', path: 'blog' },
  { title: 'گالری', path: 'gallery' },
];

function getParams(scopeId: string) {
  return { params: Number.isInteger(+scopeId) ? { query: { scopeId } } : {} } as any;
}

const emptyArr: any[] = [];

export default async function Header({ params }: PageProps<'scopeId'>) {
  const servicesItems = await Promise.all([
    queryClient.fetchQuery(queryService('news:/categories/scopes', getParams(params.scopeId))),
    queryClient.fetchQuery(queryService('forum:/categories/scopes', getParams(params.scopeId))),
  ]);

  return (
    <div className="navbar sticky">
      <div className="navbar-start">
        <Image alt="Cognitive Logo" src={Logo} width={60} />
        <div className="flex flex-auto">
          <Link href="/scopes" className="btn btn-link">
            حوزه‌ها
          </Link>
          {services.map((page, index) => (
            <ServiceMenu
              key={page.title}
              path={page.path}
              title={page.title}
              items={servicesItems[index] || emptyArr}
            />
          ))}
        </div>
      </div>
      <div className="navbar-end">
        <AuthDialogController />
      </div>
    </div>
  );
}
