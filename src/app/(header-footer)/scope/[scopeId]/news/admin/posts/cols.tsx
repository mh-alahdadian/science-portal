import { formatDateTime } from '@/utils';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

const columnHelper = createColumnHelper<Schema<'PostDTO'>>();

enum NewsStatusId {
  DRAFT = 1,
  AWAITING_CORRECTION = 2,
  AWAITING_PUBLISHED = 3,
  PUBLISHED = 4,
  UN_PUBLISH = 5,
}

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
