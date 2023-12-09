import { AppBar, Button, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'src/assets/logo.png';
import { ServiceMenu } from './ServiceMenu';
import { AuthDialogController } from './AuthDialogController';

interface Props {}

interface Page {
  title: string;
  path: string;
}

const services: Page[] = [
  { title: 'اخبار', path: '/news' },
  { title: 'انجمن', path: '/forum' },
  { title: 'کتابخانه', path: '/library' },
  { title: 'وبلاگ', path: '/blog' },
  { title: 'گالری', path: '/gallery' },
];

export default async function Header() {
  const servicesItems = await Promise.all(services.map((service) => [{ id: 1, title: 'اصلی' }]));

  return (
    <AppBar className="px-2" color="default" elevation={1} position="sticky">
      <Toolbar disableGutters>
        <Image alt="Cognitive Logo" src={Logo} width={60} />
        <div className="flex flex-auto">
          <Button LinkComponent={Link} href="/scopes" color="info" variant="text" className="">
            حوزه‌ها
          </Button>
          {services.map((page, index) => (
            <ServiceMenu key={page.title} path={page.path} title={page.title} items={servicesItems[index]} />
          ))}
        </div>
        <AuthDialogController />
      </Toolbar>
    </AppBar>
  );
}
