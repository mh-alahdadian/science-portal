'use client';

import { logout } from '@/api';
import { useProfile } from '@/hooks';
import { Avatar, Button, Dialog, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import { lazy, useState } from 'react';
import { AuthDialogs } from './auth/types';

const LoginDialog = lazy(() => import('./auth/LoginDialog'));
const SignupDialog = lazy(() => import('./auth/SignupDialog'));

export function AuthDialogController() {
  const profile = useProfile({ throwOnError: false });
  const [dialog, setDialog] = useState<AuthDialogs>();
  const [anchor, setAnchor] = useState<HTMLElement>();
  return profile ? (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar />
      </IconButton>
      <Menu open={!!anchor} onClose={() => setAnchor(undefined)} anchorEl={anchor}>
        <MenuItem>پروفایل</MenuItem>
        <MenuItem onClick={logout}>خروج</MenuItem>
      </Menu>
    </>
  ) : (
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
