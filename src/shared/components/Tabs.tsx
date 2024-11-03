import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

interface Props<T extends string | number> extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  onChange: (value: T) => void;
  options: { value: T; title: string }[];
  active: NoInfer<T>;
}

export function Tabs<T extends string | number>(props: Props<T>) {
  const { active, onChange, options, className, ...rest } = props;
  return (
    <div {...rest} role="tablist" className={clsx('tabs tabs-bordered tabs-lg bg-transparent not-styled', className)}>
      {props.options.map((o) => (
        <button
          key={o.value}
          role="tab"
          onClick={() => props.onChange(o.value)}
          className={clsx(`tab sm:text-sm border-primary`, props.active === o.value && 'tab-active [--bc:var(--p)]')}
        >
          {o.title}
        </button>
      ))}
    </div>
  );
}
