import { useParams } from 'next/navigation';

export function getScopeUrl(scopeId: number) {
  return `/scope/${scopeId}`;
}

export function useThemeName() {
  const params = useParams();
  const scopeId = params.scopeId as string;
  return scopeId === '0' ? 'dark' : 'light';
}
