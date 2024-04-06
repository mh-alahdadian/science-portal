import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';
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
}

function SelectField(props: Props, ref: any) {
  const {
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
        <select ref={ref} {...selectProps} className="select select-bordered pr-36 w-full">
          {children}
        </select>
        <div className="absolute left-0">{endAdornment}</div>
      </div>
    </FieldWrapper>
  );
}

// @ts-ignore
const SelectFieldForwardedRef: typeof SelectField = forwardRef(SelectField);
export { SelectFieldForwardedRef as SelectField };
