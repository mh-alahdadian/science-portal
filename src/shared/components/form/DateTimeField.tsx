import { ClassNames } from '@emotion/react';
import clsx from 'clsx';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { CalendarProps, DatePickerProps } from 'react-multi-date-picker';

export function DatePickerField<Multiple extends boolean = false, Range extends boolean = false>(
  props: Omit<CalendarProps<Multiple, Range>, 'onChange'> & DatePickerProps<Multiple, Range> & { label?: string },
) {
  return (
    <ClassNames>
      {({ css }) => (
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          {...props}
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
            props.containerClassName,
          )}
          inputClass={clsx('not-styled w-0 flex-grow', props.inputClass)}
        />
      )}
    </ClassNames>
  );
}
