import { ClassNames } from '@emotion/react';
import clsx from 'clsx';
import DatePicker, { CalendarProps, DatePickerProps } from 'react-multi-date-picker';

function dbg<T>(x: T) {
  console.log(x);
  return x;
}

export function DatePickerField<Multiple extends boolean = false, Range extends boolean = false>(
  props: Omit<CalendarProps<Multiple, Range>, 'onChange'> & DatePickerProps<Multiple, Range> & { label?: string },
) {
  return (
    <ClassNames>
      {({ css }) => (
        <DatePicker
          containerClassName={clsx(
            'input input-bordered',
            css`
                height: auto !important;
                display: flex !important;
                justify-content: center;
                gap: 0.5rem;
                align-items: center;
                &::before {
                    content: "${props.label}:";
                    white-space: nowrap;
                    display: flex;
                    opacity: 0.8;
                }
            `,
          )}
          {...props}
          inputClass="not-styled w-0 flex-grow"
        />
      )}
    </ClassNames>
  );
}
