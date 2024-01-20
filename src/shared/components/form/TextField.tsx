import { InputHTMLAttributes, ReactElement, ReactNode, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  formControlClassName?: string;

  label?: ReactNode;
  labelAlt?: ReactNode;
  helperText?: ReactNode;
  helperAltText?: ReactNode;

  // formControlClassName: string;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
}

function TextField(props: Props, ref: any) {
  const { startAdornment, endAdornment, label, labelAlt, helperText, helperAltText, ...inputProps } = props;
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{labelAlt}</span>
      </div>

      <label className="relative label">
        {startAdornment}
        <input
          ref={ref}
          {...inputProps}
          // type="text"
          className="input input-bordered w-full max-w-xs"
        />
        {endAdornment}
      </label>

      <div className="label">
        <span className="label-text-alt">{helperText}</span>
        <span className="label-text-alt">{helperAltText}</span>
      </div>
    </label>
  );
}

// @ts-ignore
const X: typeof TextField = forwardRef(TextField);
export { X as TextField }
