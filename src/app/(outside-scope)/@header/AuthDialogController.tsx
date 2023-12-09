'use client';

import { Button, Dialog, DialogContent } from '@mui/material';
import { lazy, useState } from 'react';
import { AuthDialogs } from './auth/types';

const LoginDialog = lazy(() => import('./auth/LoginDialog'));
const SignupDialog = lazy(() => import('./auth/SignupDialog'));

export function AuthDialogController() {
  const [dialog, setDialog] = useState<AuthDialogs>();
  return (
    <>
      <Button variant="contained" onClick={() => setDialog('login')}>
        ورود
      </Button>
      <Dialog open={!!dialog} onClose={() => setDialog(undefined)}>
        <DialogContent>
          {dialog === 'login' ? <LoginDialog setDialog={setDialog} /> : <SignupDialog setDialog={setDialog} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
