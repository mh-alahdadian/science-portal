import type { defaultPagination } from '@/constants';

export function paginationStateToQuery(state: typeof defaultPagination) {
  return {
    pageable: {
      page: state.pageIndex,
      size: state.pageSize,
    },
  };
}
