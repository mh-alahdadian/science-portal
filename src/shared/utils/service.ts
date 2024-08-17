import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export function paginationStateToQuery(state: PaginationState) {
  return {
    pageable: {
      page: state.pageIndex,
      size: state.pageSize,
    },
  };
}

export function filterStateToQuery(state: ColumnFiltersState) {
  return {
    searchDTO: Object.fromEntries(state.map((s) => [s.id, s.value])),
  };
}

export function sortingStateToQuery(state: SortingState) {
  return {
    sort: state.map((s) => `${s.id}${s.desc ? ",desc" : ""}`),
  };
}
