import { queryService } from '@/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useProfile(options?: Partial<UseQueryOptions<any>>) {
  return useQuery({...queryService('core:/user/profile', {}), ...options}).data as any;
}
