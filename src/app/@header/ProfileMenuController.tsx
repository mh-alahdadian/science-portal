'use client';

import { logout } from '@/api';
import { useProfile } from '@/hooks';
import Link from 'next/link';

export default function AuthDialogController() {
  const profile = useProfile({ throwOnError: false, retry: 0 });
  return profile ? (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button role="button" className="btn-sm">
        <div className="avatar">hi</div>
      </button>
      <ul className="dropdown-content z-[1] menu p-2">
        <li className="item">پروفایل</li>
        <li className="item" onClick={logout}>
          خروج
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
