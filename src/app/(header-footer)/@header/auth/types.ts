export interface AuthDialogProps {
  setDialog: (dialog: AuthDialogs) => void;
}

export type AuthDialogs = 'login' | 'signup' | undefined;
