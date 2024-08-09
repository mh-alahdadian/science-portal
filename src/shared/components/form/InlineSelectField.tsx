import clsx from 'clsx';
import { ReactNode, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;

  children?: ReactNode;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  ref?: any;
}

export function InlineSelectField(props: Props) {
  const {
    ref,
    label,
    children,

    startAdornment,
    endAdornment,
    ...selectProps
  } = props;

  return (
    <label role="select" className="flex items-center pe-4">
      {startAdornment || <p className="opacity-80 whitespace-nowrap">{label}:</p>}
      <select ref={ref} {...selectProps} className={clsx('not-styled grow px-4 w-0', selectProps.className)}>
        {children}
      </select>
      {endAdornment}
    </label>
  );
}
