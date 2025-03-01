import { type Table, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { Fragment } from 'react';

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
          headerGroup.headers.map((header) => (
            <Fragment key={header.id}>{flexRender(header.column.columnDef.filter, header.getContext())}</Fragment>
          ))
        )}
    </div>
  );
}
