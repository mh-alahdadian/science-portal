import { DatePickerField, InlineSelectField, InlineTextField } from '@/components';
import { formatDateTime } from '@/utils';
import { Reaction } from '@service/components/feedback';
import { ReactionType } from '@service/constants';
import { NewsStatusId } from '@service/news/constants';
import { RowData, createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { DateObject } from 'react-multi-date-picker';

const columnHelper = createColumnHelper<Schema<'UserInfoDTO'>>();

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    categories: Record<string, SchemaOf<'news', 'CategoryDTO'> | undefined>;
    handleChangeStatus: (e: any, postId: number) => void;
  }
}

export const columns = [
  columnHelper.accessor('id', {
    header: 'شناسه',
    enableSorting: false
  }),

  columnHelper.accessor('firstName', {
    header: 'نام',
    cell: ({ row }) => {
      return (
        <span className="btn-link block max-w-52 overflow-hidden text-ellipsis" href={`../write/${row.original.id}`}>
          {row.original.firstName}
        </span>
      );
    },
    enableSorting: false
  }),

  columnHelper.accessor('lastName', {
    header: 'نام خانوادگی',
    cell: ({ row }) => {
        return (
          <span className="btn-link block max-w-52 overflow-hidden text-ellipsis" href={`../write/${row.original.id}`}>
            {row.original.lastName}
          </span>
        );
      },
    enableSorting: false,
  }),

  columnHelper.accessor('email', {
    header: 'آدرس ایمیل',
    cell: ({ row }) => {
        return (
          <span className="btn-link block max-w-52 overflow-hidden text-ellipsis" href={`../write/${row.original.id}`}>
            {row.original.email}
          </span>
        );
      },
    enableSorting: false,
  }),

  columnHelper.accessor('phoneNumber', {
    header: 'شماره موبایل',
    cell: ({ row }) => {
        return (
          <span className="btn-link block max-w-52 overflow-hidden text-ellipsis" href={`../write/${row.original.id}`}>
            {row.original.phoneNumber}
          </span>
        );
      },
    enableSorting: false,
  }),
];
