import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

const columnHelper = createColumnHelper<Schema<'PostDTO'>>();

export const columns = [
  columnHelper.accessor('title', {
    header: 'عنوان خبر',
    cell: ({ row }) => {
      return (
        <Link className="btn-link" href={`${row.original.id}`}>
          {row.original.title}
        </Link>
      );
    },
  }),

  columnHelper.accessor('publishAt', {
    cell: ({ row }) => {
      const shamsiDate = new Date(row.original.createAt!).toLocaleString('fa-IR');

      return shamsiDate;
    },
  }),

  columnHelper.accessor('isPublic', {
    cell: ({ row, table }) => {
      const { handleChangeStatus } = table.options.meta as any;
      return (
        <select
          className="select-sm"
          onChange={(e) => {
            handleChangeStatus(e, row.original.id);
          }}
        >
          <option value="1">draft</option>
          <option value="2">در انتظار تایید</option>
          <option value="3">در انتظار اصلاح</option>
          <option value="4">در انتظار انتشار</option>
          <option value="5">منتشر شده</option>
          <option value="6">منتشر نشده</option>
        </select>
      );
    },
  }),
];
