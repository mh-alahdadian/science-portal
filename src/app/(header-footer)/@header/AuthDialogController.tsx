'use client';

import { logout } from '@/api';
import { useProfile } from '@/hooks';
import { lazy, useState } from 'react';
import { AuthDialogs } from './auth/types';

const LoginDialog = lazy(() => import('./auth/LoginDialog'));
const SignupDialog = lazy(() => import('./auth/SignupDialog'));

export function AuthDialogController() {
  const profile = useProfile({ throwOnError: false, retry: 0 });
  const [dialog, setDialog] = useState<AuthDialogs>();
  return profile ? (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button role="button" className="btn btn-sm">
        <div className="avatar">hi</div>
      </button>
      <ul className="dropdown-content z-[1] menu p-2">
        <li>پروفایل</li>
        <li onClick={logout}>خروج</li>
      </ul>
    </div>
  ) : (
    <>
      <button className="btn" onClick={() => setDialog('login')}>
        ورود
      </button>
      <dialog className="modal" open={!!dialog}>
        <div className="modal-box">
          {dialog === 'login' ? <LoginDialog setDialog={setDialog} /> : <SignupDialog setDialog={setDialog} />}
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setDialog(undefined)}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
