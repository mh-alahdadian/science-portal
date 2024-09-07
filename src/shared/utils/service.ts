import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { is } from 'ramda';

export function paginationStateToQuery(state: PaginationState) {
  return {
    pageable: {
      page: state.pageIndex,
      size: state.pageSize,
    },
  };
}

function parseValue(v: any) {
  if (v instanceof Date) {
    return v.toISOString().split('T')[0];
  } else return v;
}

export function filterStateToQuery(state: ColumnFiltersState) {
  return {
    searchDTO: Object.fromEntries(
      state.flatMap((s) =>
        is(Object, s.value)
          ? Object.entries(s.value).map(([id, value]) => [id, parseValue(value)])
          : [[s.id, parseValue(s.value)]],
      ),
    ),
  };
}

export function sortingStateToQuery(state: SortingState) {
  return {
    sort: state.map((s) => `${s.id}${s.desc ? ',desc' : ''}`),
  };
}
