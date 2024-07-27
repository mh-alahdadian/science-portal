import { createEvent } from '@/utils/event-emitter';
import { QueryClient, UseMutationOptions, type UseQueryOptions, isServer } from '@tanstack/react-query';
import createClient, { type FetchOptions, type FetchResponse } from 'openapi-fetch';
import type { FilterKeys, PathsWithMethod as PathsWith } from 'openapi-typescript-helpers';

interface RequestContext {
  method: Methods;
  url: string;
  payload: any | RequestInit;
  waitForPromise?: Promise<void>;
}

const [emitApiEvent, listenApiEvent] = createEvent<{
  request: (request: RequestContext) => void;
  data: (data: any, request: RequestContext) => void;
  error: (error: any, request: RequestContext) => void;
}>();
export { listenApiEvent };

type Paths = ApiPaths;

const serverUrl = isServer ? require('src/config').server_url : '/api/';

const api = createClient<Paths>({
  baseUrl: serverUrl,
  querySerializer: { object: { style: 'form', explode: true } },
  cache: 'no-cache',
});
type Methods = Lowercase<keyof typeof api>;

export async function request(method: Methods, url: string, payload: any) {
  const request: RequestContext = { method, url, payload };
  url = '/' + url.split(':').join('');

  emitApiEvent('request', request);

  if (request.waitForPromise) await request.waitForPromise;
  // @ts-ignore
  const { data, error } = await api[method.toUpperCase()](url, payload);
  if (error) {
    emitApiEvent('error', error, request);
    throw error;
  }
  emitApiEvent('data', data, request);
  return data;
}

// @ts-ignore
type PathsOf<M> = PathsWith<Paths, M>;
type RequestData<M extends Methods, P extends PathsOf<M>> = FetchOptions<FilterKeys<Paths[P], M>>;
type ResponseData<M extends Methods, P extends PathsOf<M>> = NonNullable<
  FetchResponse<Paths[P][keyof Paths[P] & M], unknown, '*/*'>['data']
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
      throwOnError: false,
      retry: isServer ? false : undefined,
      queryFn: async (context) => {
        // TODO: support non get services
        // TODO: assert if queryKey is what we want
        return request('get', ...(context.queryKey as Parameters<typeof api.GET>));
      },
    },
  },
});
