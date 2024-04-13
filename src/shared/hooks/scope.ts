import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const defaultScope: Schema<'ScopeDTO'> = {
  id: 0,
  title: 'عمومی',
  enable: true,
};

export function useScopePrefix() {
  const { scopeId } = useParams();
  return `/scope/${scopeId || '0'}`;
}

export function useCurrentScope() {
  const { scopeId } = useParams();
  const enabled = !!scopeId && Number.isInteger(+scopeId);
  const { data } = useQuery({
    ...queryService('core:/v1/scopes/{scopeId}', { params: { path: { scopeId: +scopeId } } }),
    ...{ suspense: true },
    enabled,
  });
  return enabled ? data! : defaultScope;
}
