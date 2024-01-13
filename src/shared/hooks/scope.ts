import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const defaultScope: Schema<'ScopeDTO'> = {
  id: 'general' as any,
  title: 'عمومی',
  enable: true,
};

export function useScopePrefix() {
  const { scopeId } = useParams();
  return `/scope/${scopeId || 'general'}`;
}

export function useCurrentScope() {
  const { scopeId } = useParams();
  const enabled = !!scopeId && Number.isInteger(+scopeId);
  const { data } = useQuery({
    ...queryService('core:/admin/scopes/{scopeId}', { params: { path: { scopeId: +scopeId } } }),
    ...{ suspense: true },
    enabled,
  });
  return enabled ? data! : defaultScope;
}
