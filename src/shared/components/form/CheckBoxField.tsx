import { InputHTMLAttributes, ReactNode } from 'react';

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

export function CheckBoxField(props: Props) {
  const {
    ref,
    children,

    startAdornment,
    endAdornment,
    ...inputProps
  } = props;

  return (
    <div className="form-control flex-auto flex-shrink-0">
      <label className="label cursor-pointer gap-2">
        <span className="label-text">{startAdornment}</span>
        <input ref={ref} {...inputProps} type="checkbox" className="checkbox" />
        {endAdornment}
      </label>
    </div>
  );
}
