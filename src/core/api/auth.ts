'use client';

import { MutationObserver } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { listenApiEvent, mutateService, queryClient } from './api';
import { getToken, removeToken, setToken } from './utils';

// TODO: Regulate system date-time if it was not correct

let refreshingTokenPromise: Promise<void> | undefined;
let expTime = 1;

const refreshTokenMutation = new MutationObserver(queryClient, {
  ...mutateService('post', 'core:/auth/refresh-token'),
  retry: 3,
  // onSuccess(data, variables, context) {
  //   setToken(data)
  // },
  onError(error, variables, context) {
    if ((error as any).status == 401) {
      logout()
    }
  },
});

const config = {
  refreshPath: 'core:/auth/refresh-token',
  loginPath: 'core:/auth/login/',
  expDelaySec: 10,
  refreshFn: (refreshToken: string) => refreshTokenMutation.mutate({ body: { refreshToken } }),
};

listenApiEvent('request', (request) => {
  const { accessToken, refreshToken } = getToken();
  if (refreshToken && !refreshingTokenPromise && Date.now() > expTime - config.expDelaySec * 1000) {
    refreshingTokenPromise = config
      .refreshFn(refreshToken)
      .then(setToken)
      .finally(() => {
        refreshingTokenPromise = undefined;
      });
  }

  request.payload.headers ??= {};
  request.payload.headers['Authorization'] = 'Bearer ' + accessToken;
  request.waitForPromise = refreshingTokenPromise;

  // TODO: only if auth needed
  request.waitForPromise = refreshingTokenPromise;
});

listenApiEvent('data', (data, request) => {
  if (request.url.startsWith(config.loginPath) || request.url.startsWith(config.refreshPath)) {
    expTime = jwtDecode(data.accessToken).exp! * 1000;
    setToken(data);
  }
});

export function logout() {
  removeToken();
}

export {};
