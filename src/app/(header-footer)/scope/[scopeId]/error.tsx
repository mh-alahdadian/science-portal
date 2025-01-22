'use client';

import { getParsedToken } from '@/api/utils';
import { usePathname } from 'next/navigation';

export default function ScopeError(props: PageProps<'scopeId'>) {
  const token = getParsedToken();
  const [empty, scope, scopeId, service] = usePathname().split('/');
  const notAccess = !token && scopeId !== '0';
  return (
    <div className="place-self-center text-2xl prose-2xl">
      {notAccess ? 'شما دسترسی محتوای این صفحه را ندارید' : 'خطایی پیش آمده است'}
    </div>
  );
}
