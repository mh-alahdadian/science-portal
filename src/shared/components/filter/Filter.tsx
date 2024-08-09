import { css } from '@emotion/react';
import { type Table, flexRender } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
}

export function Filter<TData>({ table }: Props<TData>) {
  return (
    <div
      css={css`
      label, .rmdp-container {
        min-width: 12rem;
        max-width: 20rem;
      }
    `}
      className="flex flex-wrap w-full gap-2"
    >
      {table
        .getHeaderGroups()
        .flatMap((headerGroup) =>
          headerGroup.headers.map((header) => flexRender(header.column.columnDef.filter, header.getContext())),
        )}
    </div>
  );
}
