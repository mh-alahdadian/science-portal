import { Star } from '@phosphor-icons/react';
import clsx from 'clsx';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function Rating(props: Props) {
  const { value, onChange } = props;
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Star
            key={index}
            size={32}
            className={clsx(index < value ? 'text-warning' : '', '')}
            weight={index < value ? 'fill' : 'regular'}
            onClick={() => onChange(index + 1)}
          />
        ))}
    </div>
  );
}
