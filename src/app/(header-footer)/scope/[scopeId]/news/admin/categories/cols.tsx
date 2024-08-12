import { Pen } from '@phosphor-icons/react';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<SchemaOf<'news', 'CategoryDTO'>>();

export const columns = [
  columnHelper.accessor('id', {
    // header: ''
  }),

  columnHelper.accessor('title', {
    header: 'عنوان',
  }),

  columnHelper.accessor('enable', {
    header: 'وضعیت',
  }),

  columnHelper.display({
    header: 'فعالیت‌ها',

    cell: (props) => {
      const { setEditingItem } = props.table.options.meta as { setEditingItem: Function };
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
