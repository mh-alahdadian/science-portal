'use client';

import { getParsedToken } from '@/api/utils';
import { usePathname } from 'next/navigation';

export default function ScopeError(props: PageProps<'scopeId'> & { error?: Error }) {
  const token = getParsedToken();
  const [empty, scope, scopeId, service] = usePathname().split('/');
  const notAccess = !token && scopeId !== '0';

  let message: string = '';
  if (notAccess) {
    message = 'شما دسترسی محتوای این صفحه را ندارید';
  }

  if (props.error?.message) {
    message = props.error?.message;
  }

  return <div className="place-self-center text-2xl prose-2xl">{message || 'خطایی پیش آمده است'}</div>;
}
