import clsx from 'clsx';

interface Props<T extends string | number> {
  onChange: (value: T) => void;
  options: { value: T; title: string }[];
  active: NoInfer<T>;
}

export function Tabs<T extends string | number>(props: Props<T>) {
  return (
    <div role="tablist" className="tabs tabs-boxed tabs-lg">
      {props.options.map((o) => (
        <button
          key={o.value}
          role="tab"
          onClick={() => props.onChange(o.value)}
          className={clsx(`tab`, props.active === o.value && 'tab-active')}
        >
          {o.title}
        </button>
      ))}
    </div>
  );
}
