import { Pen } from '@phosphor-icons/react';
import { AccessorKeyColumnDef, RowData, createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { TextCell } from 'src/shared/components';

type User = Schema<'UserInfoDTO'>;

const columnHelper = createColumnHelper<User>();

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    setEditingUser?: Dispatch<SetStateAction<User | null>>;
    applyUserRegistration?: (user: User, approvalStatus: boolean) => void;
  }
}

export const userInfoColumns = [
  columnHelper.accessor('id', {
    header: 'شناسه',
    enableSorting: false,
  }),

  columnHelper.accessor('firstName', {
    header: 'نام',
    cell: TextCell,
    enableSorting: false,
  }),

  columnHelper.accessor('lastName', {
    header: 'نام خانوادگی',
    cell: TextCell,
    enableSorting: false,
  }),

  columnHelper.accessor('email', {
    header: 'آدرس ایمیل',
    cell: TextCell,
    enableSorting: false,
  }),

  columnHelper.accessor('phoneNumber', {
    header: 'شماره موبایل',
    cell: TextCell,
    enableSorting: false,
  }),
] as AccessorKeyColumnDef<User, any>[];

export const columns = [
  ...userInfoColumns,
  columnHelper.display({
    id: 'actions',
    header: 'فعالیت‌ها',
    enableSorting: false,

    cell: (props) => {
      const setEditingUser = props.table.options.meta!.setEditingUser!;

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
