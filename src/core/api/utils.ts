import { isServer } from '@tanstack/react-query';
import { queryClient, queryService } from './api';
import Cookies from 'js-cookie';

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';
const ACCESS_TOKEN_KEY = 'accessToken';

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

let cachedToken: Tokens;
export function getToken(): Tokens {
  if (isServer) {
    const { cookies } = require('next/headers');
    return { accessToken: cookies().get(ACCESS_TOKEN_KEY)?.value };
  } else {
    if (cachedToken) return cachedToken;
    const x = localStorage.getItem(TOKEN_STORAGE_KEY);
    cachedToken = x ? JSON.parse(x) : {};
    return cachedToken;
  }
}

export function setToken(newToken: Tokens) {
  if (isServer) return;

  cachedToken = { accessToken: newToken.accessToken, refreshToken: newToken.refreshToken };
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(cachedToken));
  Cookies.set(ACCESS_TOKEN_KEY, cachedToken.accessToken!)
  queryClient.invalidateQueries({ queryKey: queryService('core:/user/profile', {}).queryKey });
}

export function removeToken() {
  if (isServer) return;

  localStorage.removeItem(TOKEN_STORAGE_KEY);
  Cookies.remove(ACCESS_TOKEN_KEY)
  queryClient.invalidateQueries({ queryKey: queryService('core:/user/profile', {}).queryKey });
}
