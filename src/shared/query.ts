import { RefetchOptions, UseSuspenseQueryResult } from '@tanstack/react-query';
import { prop } from 'ramda';

export function combineQueries<T extends [...UseSuspenseQueryResult[]]>(result: T) {
  const isLoading = result.some((q) => q.isLoading),
    isError = result.some((q) => q.isError),
    refetch = (options?: RefetchOptions) => Promise.all(result.map((q) => q.refetch(options)));
  type MapTupleData<T> = { [K in keyof T]: T[K] extends { data: infer U } ? U : T[K] };
  const dataList = result.map(prop('data')) as MapTupleData<typeof result>;

  return [dataList, { isLoading, isError, refetch }] as const;
}
