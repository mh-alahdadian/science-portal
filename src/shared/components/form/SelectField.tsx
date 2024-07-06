import { ReactNode, SelectHTMLAttributes } from 'react';
import { FieldWrapper } from './FieldWrapper';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;

  children: ReactNode;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  ref?: any;
}

export function SelectField(props: Props) {
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
    ...selectProps
  } = props;

  return (
    <FieldWrapper {...{ formControlClassName, label, labelAlt, helperText, helperAltText }}>
      <div className="relative flex items-center">
        <div className="absolute pointer-events-none right-0">{startAdornment}</div>
        <div className="absolute pointer-events-none right-4">{selectProps.placeholder}</div>
        <select ref={ref} {...selectProps} className="pr-36 w-full">
          {children}
        </select>
        <div className="absolute left-0">{endAdornment}</div>
      </div>
    </FieldWrapper>
  );
}
