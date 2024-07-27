import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldWrapper } from './FieldWrapper';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;

  children?: ReactNode;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  ref?: any;
}

export function TextField(props: Props) {
  const {
    ref,

    formControlClassName,
    label,
    labelAlt,
    helperText,
    helperAltText,

    children,

    startAdornment,
    endAdornment,
    ...inputProps
  } = props;

  return (
    <FieldWrapper {...{ formControlClassName, label, labelAlt, helperText, helperAltText }}>
      <div role="input" className="flex items-center gap-2">
        {startAdornment}
        {children || <input ref={ref} {...inputProps} className="not-styled grow" />}
        {endAdornment}
      </div>
    </FieldWrapper>
  );
}
