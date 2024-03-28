import clsx from 'clsx';
import { ReactNode, SelectHTMLAttributes, forwardRef } from 'react';

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
    <label className={clsx('form-control w-full', formControlClassName)}>
      {(label || labelAlt) && (
        <div className="label pt-0">
          <span className="label-text">{label}</span>
          <span className="label-text-alt">{labelAlt}</span>
        </div>
      )}

      <div className="relative flex items-center">
        <div className="absolute pointer-events-none right-0">{startAdornment}</div>
        <div className="absolute pointer-events-none right-4">{selectProps.placeholder}</div>
        <select ref={ref} {...selectProps} className="select select-bordered pr-36 w-full">
          {children}
        </select>
        <div className="absolute left-0">{endAdornment}</div>
      </div>

      {(helperText || helperAltText) && (
        // in design this texts has line-height:18px
        <div className="label pb-0">
          <span className="label-text-alt">{helperText}</span>
          <span className="label-text-alt">{helperAltText}</span>
        </div>
      )}
    </label>
  );
}

// @ts-ignore
const SelectFieldForwardedRef: typeof SelectField = forwardRef(SelectField);
export { SelectFieldForwardedRef as SelectField };
