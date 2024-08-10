import { type Table, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

interface Props<TData> {
  table: Table<TData>;
  className?: string;
}

export function Filter<TData>({ table, ...props }: Props<TData>) {
  return (
    <div className={clsx('flex flex-wrap w-full gap-2', props.className)}>
      {table
        .getHeaderGroups()
        .flatMap((headerGroup) =>
          headerGroup.headers.map((header) => flexRender(header.column.columnDef.filter, header.getContext())),
        )}
    </div>
  );
}
