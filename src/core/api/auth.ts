'use client';

import { isServer } from '@tanstack/react-query';
import { listenApiEvent, mutateService } from './api';
import { getParsedToken, getToken, removeToken, setToken } from './utils';

// TODO: Regulate system date-time if it was not correct

let refreshingTokenPromise: Promise<void> | undefined;

const config = {
  obtainTokenPaths: ['core:/v1/auth/refresh-token', 'core:/v1/auth/login/password', 'core:/v1/auth/register'],
  expDelaySec: 10,
};

listenApiEvent('request', (request) => {
  const { accessToken } = getToken();
  // if(!accessToken) redirect('/login')
  request.payload.headers ??= {};
  // if (request.url.startsWith('core')) return;
  request.payload.headers['Authorization'] = 'Bearer ' + accessToken;
});

if (!isServer) {
  listenApiEvent('request', (request) => {
    const { refreshToken } = getToken();
    if (
      !request.url.endsWith('core:/v1/auth/refresh-token') &&
      refreshToken &&
      !refreshingTokenPromise &&
      Date.now() > (getParsedToken()!.exp - config.expDelaySec) * 1000
    ) {
      refreshingTokenPromise = mutateService('post', 'core:/v1/auth/refresh-token').mutationFn!({
        params: { query: { refreshToken } },
      })
        .then(setToken)
        .catch((error: any) => {
          if (error.status == 400) {
            logout();
          }
        })
        .finally(() => {
          refreshingTokenPromise = undefined;
        });
    }

    // TODO: only if auth needed
    request.waitForPromise = refreshingTokenPromise;
  });
  listenApiEvent('error', (error, request) => {
    console.log(error);
    if (error) {
    }
  });
}

listenApiEvent('data', (data, request) => {
  if (config.obtainTokenPaths.some((path) => request.url.startsWith(path))) {
    setToken(data);
  }
});

export function logout() {
  removeToken();
  // const key = queryService('core:/v1/users/profile', {}).queryKey;
  // queryClient.invalidateQueries({ queryKey: key });
  window.location.href = '/login';
}
