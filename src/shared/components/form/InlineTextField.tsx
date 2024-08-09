import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;

  children?: ReactNode;
  containerClassName?: string;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  ref?: any;
}

export function InlineTextField(props: Props) {
  const {
    ref,
    label,
    children,

    containerClassName,

    startAdornment,
    endAdornment,
    ...inputProps
  } = props;

  return (
    <label role="input" className={clsx("flex items-center gap-2")}>
      {startAdornment || <p className="opacity-80 whitespace-nowrap">{label}:</p>}
      {children || <input ref={ref} {...inputProps} className={clsx('not-styled grow w-10', inputProps.className)} />}
      {endAdornment}
    </label>
  );
}
