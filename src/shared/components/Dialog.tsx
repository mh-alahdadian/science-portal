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
      <div className="modal-box" {...rest}>
        <form method="dialog" onSubmit={onClose}>
          <button className="btn-sm btn-circle btn-ghost  relative top-[-1rem] right-[-1rem]">
            <X />
          </button>
        </form>
        {children}
      </div>
      <div className="modal-backdrop bg-black" onClick={onClose}></div>
    </dialog>
  );
}
