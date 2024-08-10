import type { defaultPagination } from '@/constants';
import { ColumnFilter } from '@tanstack/react-table';

export function paginationStateToQuery(state: typeof defaultPagination) {
  return {
    pageable: {
      page: state.pageIndex,
      size: state.pageSize,
    },
  };
}

export function filterStateToQuery(state: ColumnFilter[]) {
  return {
    searchDTO: Object.fromEntries(state.map(s => [s.id, s.value])),
  };
}
