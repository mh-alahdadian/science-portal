import { queryClient, queryService } from '@/api';
import { AppBar, Button, Toolbar } from '@mui/material';
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
  const servicesItems = (await Promise.all([
    queryClient.fetchQuery(queryService('news:/categories/scopes', getParams(params.scopeId))),
    queryClient.fetchQuery(queryService('forum:/categories/scopes', getParams(params.scopeId))),
  ]));

  return (
    <AppBar className="px-2" color="default" elevation={1} position="sticky">
      <Toolbar disableGutters>
        <Image alt="Cognitive Logo" src={Logo} width={60} />
        <div className="flex flex-auto">
          <Button LinkComponent={Link} href="/scopes" color="info" variant="text" className="">
            حوزه‌ها
          </Button>
          {services.map((page, index) => (
            <ServiceMenu
              key={page.title}
              path={page.path}
              title={page.title}
              items={servicesItems[index] || emptyArr}
            />
          ))}
        </div>
        <AuthDialogController />
      </Toolbar>
    </AppBar>
  );
}
