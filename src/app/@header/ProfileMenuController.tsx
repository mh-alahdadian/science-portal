'use client';

import { logout } from '@/api';
import { useProfile } from '@/hooks';
import Link from 'next/link';

export default function AuthDialogController() {
  const profile = useProfile({ throwOnError: false, retry: 0 });
  return profile ? (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button tabIndex={0} role="button" className="btn-sm">
        <div className="avatar">
          {profile.firstName} {profile.lastName}
        </div>
      </button>
      <ul tabIndex={0} className="dropdown-content menu z-[1] p-2 bg-neutral">
        <li>
          <span>پروفایل</span>
        </li>
        <li onClick={logout}>
          <span>خروج</span>
        </li>
      </ul>
    </div>
  ) : (
    <>
      <Link href="/login" role="button">
        ورود
      </Link>
    </>
  );
}
