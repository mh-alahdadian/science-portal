import { listenApiEvent, request } from './api';
import { getToken, removeToken, setToken } from './utils';

let refreshingTokenPromise: Promise<void> | undefined;

const config = {
  refreshPath: 'core:/auth/refresh-token',
  loginPath: 'core:/auth/login/',
  refreshFn: (refreshToken: string) => request('post', 'core:/auth/refresh-token', { body: { refreshToken } }),
};

listenApiEvent('request', (request) => {
  request.payload.headers ??= {};
  request.payload.headers['Authorization'] = 'Bearer ' + getToken().accessToken;
  request.waitForPromise = refreshingTokenPromise;

  // TODO: only if auth needed
  request.waitForPromise = refreshingTokenPromise;
});

listenApiEvent('data', (data, request) => {
  if (request.url.startsWith(config.loginPath) || request.url.startsWith(config.refreshPath)) {
    setToken(data);
  }
});

listenApiEvent('error', (error, request) => {
  if (error.status == 401) {
    const { refreshToken } = getToken();
    if (!refreshToken) return;

    refreshingTokenPromise = config.refreshFn(refreshToken).then(({ data }) => {
      data = data as any;
      if (data) {
        setToken(data);
      }
      refreshingTokenPromise = undefined;
    });
  }
});

export function logout() {
  removeToken()  
}

export {};
