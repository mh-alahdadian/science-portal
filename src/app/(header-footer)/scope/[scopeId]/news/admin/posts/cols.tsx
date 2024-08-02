import { formatDateTime } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { NewsStatusId } from '../../constants';

const columnHelper = createColumnHelper<Schema<'PostDTO'>>();

export const columns = [
  columnHelper.accessor('title', {
    header: 'عنوان خبر',
    cell: ({ row }) => {
      return (
        <Link className="btn-link" href={`../write/${row.original.id}`}>
          {row.original.title}
        </Link>
      );
    },
  }),

  columnHelper.accessor('publishAt', {
    cell: ({ row }) => formatDateTime(row.original.createdAt!),
  }),

  columnHelper.accessor('statusId', {
    cell: ({ row, table }) => {
      const { handleChangeStatus } = table.options.meta as any;
      return (
        <select
          className="select-sm"
          value={row.original.statusId}
          onChange={(e) => {
            handleChangeStatus(e, row.original.id);
          }}
        >
          <option value={NewsStatusId.DRAFT}>پیش‌نویس</option>
          <option value={NewsStatusId.AWAITING_CORRECTION}>در انتظار اصلاح</option>
          <option value={NewsStatusId.AWAITING_PUBLISHED}>در انتظار انتشار</option>
          <option value={NewsStatusId.PUBLISHED}>منتشر شده</option>
          <option value={NewsStatusId.UN_PUBLISH}>منتشر نشده</option>
        </select>
      );
    },
  }),
];
