import clsx from 'clsx';
import { InputHTMLAttributes, ReactElement, ReactNode, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;

  children?: ReactNode;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

function TextField(props: Props, ref: any) {
  const {
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
    <label className={clsx('form-control w-full', formControlClassName)}>
      {(label || labelAlt) && (
        <div className="label pt-0">
          <span className="label-text">{label}</span>
          <span className="label-text-alt">{labelAlt}</span>
        </div>
      )}

      <div className="relative flex items-center">
        <div className="absolute right-0">{startAdornment}</div>
        {children || <input ref={ref} {...inputProps} className="input input-bordered w-full" />}
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
const TextFieldForwardedRef: typeof TextField = forwardRef(TextField);
export { TextFieldForwardedRef as TextField };
