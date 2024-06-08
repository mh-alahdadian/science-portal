import { css } from '@emotion/react';
import type { Icon } from '@phosphor-icons/react';
import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'span'> {
  Icon: Icon;
  text: ReactNode;
}

export function TextIcon({ Icon, text, ...rest }: Props) {
  return (
    <span {...rest}>
      <Icon size={24} />
      <span
        css={css`
          unicode-bidi: plaintext;
        `}
        className="ms-2.5"
      >
        {text}
      </span>
    </span>
  );
}
