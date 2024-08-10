import { DatePickerField, InlineSelectField, InlineTextField } from '@/components';
import { formatDateTime } from '@/utils';
import { NewsStatusId } from '@service/news/constants';
import { RowData, createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { DateObject } from 'react-multi-date-picker';

const columnHelper = createColumnHelper<Schema<'PostDTO'>>();

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    categories: Record<string, SchemaOf<'news', 'CategoryDTO'> | undefined>;
    handleChangeStatus: (e: any, postId: number) => void;
  }
}

export const columns = [
  columnHelper.accessor('id', {
    header: 'شناسه',
  }),

  columnHelper.accessor('title', {
    header: 'عنوان خبر',
    cell: ({ row }) => {
      return (
        <Link className="btn-link block max-w-52 overflow-hidden text-ellipsis" href={`../write/${row.original.id}`}>
          {row.original.title}
        </Link>
      );
    },
    filter: ({ column, header, table }) => {
      return (
        <InlineTextField
          containerClassName="col-2"
          label={column.columnDef.header as string}
          value={column.getFilterValue() as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
        />
      );
    },
  }),

  columnHelper.accessor('categoryId', {
    header: 'دسته‌بندی',
    cell: ({ getValue, table }) => table.options.meta!.categories[getValue()!]?.title,
    filter: ({ column, table }) => {
      return (
        <InlineSelectField
          label={column.columnDef.header as string}
          value={column.getFilterValue() as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
        >
          <option value="">همه</option>
          {Object.values(table.options.meta!.categories).map((cat) => (
            <option key={cat!.id} value={cat!.id} className="menu-item">
              {cat!.title}
            </option>
          ))}
        </InlineSelectField>
      );
    },
    enableSorting: false,
  }),

  columnHelper.accessor('isPublic', {
    header: 'سطح دسترسی',
    cell: ({ getValue }) => ({ true: 'عمومی', false: 'خصوصی' })[String(getValue()!)],
    filter: ({ column, table }) => {
      return (
        <InlineSelectField
          label={column.columnDef.header as string}
          value={column.getFilterValue() as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
        >
          <option value="">همه</option>
          <option value="true">عمومی</option>
          <option value="false">خصوصی</option>
        </InlineSelectField>
      );
    },
    enableSorting: false,
  }),

  columnHelper.accessor('createdAt', {
    header: 'زمان ایجاد',
    cell: ({ row }) => formatDateTime(row.original.createdAt!),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'زمان آخرین تغییر',
    cell: ({ row }) => formatDateTime(row.original.createdAt!),
  }),
  columnHelper.accessor('publishAt', {
    header: 'زمان انتشار',
    cell: ({ row }) => formatDateTime(row.original.createdAt!),
    filter: ({ column }) => {
      return (
        <DatePickerField
          label="زمان انتشار"
          range
          containerClassName="col-2"
          value={column.getFilterValue() as DateObject[]}
          // onChange={column.setFilterValue}
        />
      );
    },
  }),

  columnHelper.accessor('statusId', {
    header: 'وضعیت',
    cell: ({ row, table }) => {
      const { handleChangeStatus } = table.options.meta!;
      return (
        <select
          className="select-sm"
          value={row.original.statusId}
          onChange={(e) => {
            handleChangeStatus(e, row.original.id!);
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
    filter: ({ column, table }) => {
      return (
        <InlineSelectField
          label={column.columnDef.header as string}
          value={column.getFilterValue() as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
        >
          <option value="">همه</option>
          <option value={NewsStatusId.DRAFT}>پیش‌نویس</option>
          <option value={NewsStatusId.AWAITING_CORRECTION}>در انتظار اصلاح</option>
          <option value={NewsStatusId.AWAITING_PUBLISHED}>در انتظار انتشار</option>
          <option value={NewsStatusId.PUBLISHED}>منتشر شده</option>
          <option value={NewsStatusId.UN_PUBLISH}>منتشر نشده</option>
        </InlineSelectField>
      );
    },
  }),
];
