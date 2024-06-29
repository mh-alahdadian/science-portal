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
      <div className="relative flex items-center">
        <div className="absolute right-0">{startAdornment}</div>
        {children || <input ref={ref} {...inputProps} className="input input-bordered w-full" />}
        <div className="absolute left-0">{endAdornment}</div>
      </div>
    </FieldWrapper>
  );
}
