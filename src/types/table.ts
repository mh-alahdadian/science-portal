import type { ColumnDefTemplate, HeaderContext, RowData } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnDefBase<TData extends RowData, TValue = unknown> {
    filter?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  }
}
