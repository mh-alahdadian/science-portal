import type { Icon } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface Props {
  Icon: Icon;
  text: ReactNode;
}

export function TextIcon({ Icon, text }: Props) {
  return (
    <span>
      <Icon /> {text}
    </span>
  );
}
