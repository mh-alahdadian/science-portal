'use client';

import { logout } from '@/api';
import { useProfile } from '@/hooks';
import { getScopeUrl } from '@/utils/scope';
import Link from 'next/link';

function hasManagementPermission(profile: Schema<'User'>, scopeId: number) {
  return profile.roles?.some(
    (r) => (r as any).scopeId === +scopeId || r.authorities!.includes('OP_USER_BLOCK_AND_UNBLOCK'),
  );
}

export default function AuthDialogController({ scopeId }: { scopeId: number }) {
  const profile = useProfile({ throwOnError: false, retry: 0 });

  return profile && hasManagementPermission(profile, scopeId) ? (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button role="button" className="btn btn-sm">
        <div>مدیریت</div>
      </button>
      <ul className="dropdown-content z-[1] menu p-2">
        <Link href={`${getScopeUrl(scopeId)}/management/users`}>مدیریت کاربران</Link>
      </ul>
    </div>
  ) : null;
}
