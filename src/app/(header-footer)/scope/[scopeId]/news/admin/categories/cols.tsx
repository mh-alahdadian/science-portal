import { Pen } from '@phosphor-icons/react';
import { createColumnHelper, RowData } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

declare module '@tanstack/table-core' {
  export interface TableMeta<TData extends RowData> {
    setEditingItem?: Dispatch<SetStateAction<SchemaOf<'news', 'CategoryDTO'> | null>>;
  }
}

const columnHelper = createColumnHelper<SchemaOf<'news', 'CategoryDTO'>>();

export const columns = [
  columnHelper.accessor('id', {
    // header: ''
    enableSorting: false,
  }),

  columnHelper.accessor('title', {
    header: 'عنوان',
    enableSorting: false,
  }),

  columnHelper.accessor('enable', {
    header: 'وضعیت',
    enableSorting: false,
  }),

  columnHelper.display({
    header: 'فعالیت‌ها',
    enableSorting: false,

    cell: (props) => {
      const setEditingItem = props.table.options.meta!.setEditingItem!;
      return (
        <div className="flex gap-2">
          <button className="btn-circle btn-transparent btn-sm" onClick={() => setEditingItem(props.row.original)}>
            <Pen />
          </button>
        </div>
      );
    },
  }),
];
