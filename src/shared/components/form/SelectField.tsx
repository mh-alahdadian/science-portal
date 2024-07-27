import { ReactNode, SelectHTMLAttributes } from 'react';
import { FieldWrapper } from './FieldWrapper';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;
  placeholder?: ReactNode;

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
      <div role="select" className="flex items-center gap-2">
        {startAdornment || selectProps.placeholder}
        <select ref={ref} {...selectProps} className="not-styled grow">
          {children}
        </select>
        {endAdornment}
      </div>
    </FieldWrapper>
  );
}
