import { css } from '@emotion/react';
import { X } from '@phosphor-icons/react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  open: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}

export function Dialog({ open, onClose, children, ...rest }: Props) {
  return (
    <dialog open={open} className="modal">
      <div className="modal-box">{children}</div>
      <div className="modal-backdrop" onClick={onClose} {...rest}></div>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <X />
        </button>
      </form>
    </dialog>
  );
}
