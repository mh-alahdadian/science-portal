import { Pen } from '@phosphor-icons/react';
import { RowData, createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

type User = Schema<'UserInfoDTO'>;

const columnHelper = createColumnHelper<User>();

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    setEditingUser?: Dispatch<SetStateAction<User | null>>;
    applyUserRegistration?: (user: User, approvalStatus: boolean) => void;
  }
}

export const columns = [
  columnHelper.accessor('id', {
    header: 'شناسه',
    enableSorting: false,
  }),

  columnHelper.accessor('firstName', {
    header: 'نام',
    cell: ({ row }) => {
      return <span className="block max-w-52 overflow-hidden text-ellipsis">{row.original.firstName}</span>;
    },
    enableSorting: false,
  }),

  columnHelper.accessor('lastName', {
    header: 'نام خانوادگی',
    cell: ({ row }) => {
      return <span className="block max-w-52 overflow-hidden text-ellipsis">{row.original.lastName}</span>;
    },
    enableSorting: false,
  }),

  columnHelper.accessor('email', {
    header: 'آدرس ایمیل',
    cell: ({ row }) => {
      return <span className="block max-w-52 overflow-hidden text-ellipsis">{row.original.email}</span>;
    },
    enableSorting: false,
  }),

  columnHelper.accessor('phoneNumber', {
    header: 'شماره موبایل',
    cell: ({ row }) => {
      return <span className="block max-w-52 overflow-hidden text-ellipsis">{row.original.phoneNumber}</span>;
    },
    enableSorting: false,
  }),

  columnHelper.display({
    header: 'فعالیت‌ها',
    enableSorting: false,

    cell: (props) => {
      const { setEditingUser } = props.table.options.meta!;

      return (
        <div className="flex gap-2">
          <button className="btn-circle btn-transparent btn-sm" onClick={() => setEditingUser(props.row.original)}>
            <Pen />
          </button>
        </div>
      );
    },
  }),
];
