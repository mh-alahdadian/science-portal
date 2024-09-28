'use client';

import { getParsedToken } from '@/api/utils';

export default function ScopeError(props: {}) {
  const token = getParsedToken();
  return (
    <div className="flex justify-center items-center prose-2xl">
      {!token ? 'شما دسترسی محتوای این صفحه را ندارید' : 'خطایی پیش آمده است'}
    </div>
  );
}
