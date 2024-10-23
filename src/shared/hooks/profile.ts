import { queryService } from '@/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

type Profile = Schema<'UserInfoDTO'>;

export function useProfile(options?: Partial<UseQueryOptions<Profile>>) {
  return useQuery({ ...queryService('core:/v1/users/profile', {}), ...options }).data;
}
