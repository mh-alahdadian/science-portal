import type { Icon } from '@phosphor-icons/react';
import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'span'> {
  Icon: Icon;
  text: ReactNode;
}

export function TextIcon({ Icon, text, ...rest }: Props) {
  return (
    <span {...rest} className={clsx('text-nowrap', rest.className)}>
      <Icon />
      <span className="ms-2.5 text-bidi">{text}</span>
    </span>
  );
}
