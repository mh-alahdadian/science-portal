import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;
}

export function FieldWrapper(props: Props) {
  const {
    formControlClassName,

    label,
    labelAlt,
    helperText,
    helperAltText,
    children,

    ...inputProps
  } = props;

  return (
    <label className={clsx('form-control w-full', formControlClassName)}>
      {(label || labelAlt) && (
        <div className="label pt-0">
          <span className="label-text">{label}</span>
          <span className="label-text-alt">{labelAlt}</span>
        </div>
      )}
      {children}
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
