import { formatDateTime } from '@/utils';
import { CellContext } from '@tanstack/react-table';

export function TextCell<TData, TValue extends string | number | undefined>({ cell }: CellContext<TData, TValue>) {
  return <span className="block max-w-52 overflow-hidden text-ellipsis">{cell.getValue()}</span>;
}

export function DateCell<TData, TValue extends string | number | undefined>({ cell }: CellContext<TData, TValue>) {
  const value = cell.getValue();
  return <span className="block max-w-52 overflow-hidden text-ellipsis">{value ? formatDateTime(value) : '-'}</span>;
}
