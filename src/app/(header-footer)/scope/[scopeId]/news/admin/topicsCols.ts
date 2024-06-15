import { createColumnHelper } from '@tanstack/react-table';

const columnHelper: any = createColumnHelper();

export const columns = [
  columnHelper.accessor('id', {
    id: 'id',
  }),

  columnHelper.accessor('title', {
    id: 'title',
  }),
];
