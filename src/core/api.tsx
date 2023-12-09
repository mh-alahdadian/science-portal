import { QueryClient, UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import createClient, { type FetchOptions, type FetchResponse } from 'openapi-fetch';
import type { FilterKeys, PathsWithMethod as PathsWith } from 'openapi-typescript-helpers';
import type { paths as CorePaths } from 'src/generated/core';
import type { paths as ForumPaths } from 'src/generated/forum';

type PathGen<BasePath extends string, Paths> = {
  [k in keyof Paths & string as `${BasePath}${k}`]: Paths[k];
};

type Paths = PathGen<'core:', CorePaths> & PathGen<'forum:', ForumPaths>;

const isServer = typeof window === 'undefined';

const serverUrl = isServer ? require('src/config').server_url : '/api/';

const api = createClient<Paths>({ baseUrl: serverUrl, cache: 'no-cache' });
type Methods = Lowercase<keyof typeof api>;

async function request(method: Methods, url: string, payload: any) {
  url = '/' + url.split(':').join('')

  // @ts-ignore
  const { data, error } = await api[method.toUpperCase()](url, payload);
  if (error) {
    if (payload.formatError !== false && !isServer) {
      const toast = require('react-toastify').toast;
      const formatError = payload.formatError;
      toast.error(formatError(error));
    }
    throw error;
  }
  return data;
}

// @ts-ignore
type PathsOf<M> = PathsWith<Paths, M>;
type RequestData<M extends Methods, P extends PathsOf<M>> = FetchOptions<FilterKeys<Paths[P], M>>;
type ResponseData<M extends Methods, P extends PathsOf<M>> = NonNullable<
  FetchResponse<M extends keyof Paths[P] ? Paths[P][keyof Paths[P] & M] : unknown>['data']
>;

export function queryService<P extends PathsOf<'get'>>(
  ...[url, init]: [P, RequestData<'get', P>]
): UseQueryOptions<ResponseData<'get', P>> {
  return { queryKey: [url, init] };
}

export function mutateService<M extends Methods, P extends PathsOf<M>>(
  ...[method, url]: [M, P]
): UseMutationOptions<ResponseData<M, P>, never, RequestData<M, P>> {
  return { mutationFn: request.bind(null, method, url) };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      throwOnError: true,
      queryFn: async (context) => {
        // TODO: support non get services
        // TODO: assert if queryKey is what we want
        return request('get', ...(context.queryKey as Parameters<typeof api.GET>));
      },
    },
  },
});
