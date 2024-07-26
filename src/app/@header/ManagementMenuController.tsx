'use client';

import { Service } from '@/constants';
import { useProfile } from '@/hooks';
import { getScopeUrl } from '@/utils/scope';
import Link from 'next/link';

interface Props {
  scopeId: number;
  service?: Service;
}

function hasManagementPermission(profile: Schema<'UserInfoDTO'>, props: Props) {
  return profile.roles?.some(
    (r) => (r as any).scopeId === +props.scopeId || r.authorities!.some((x) => x.title === 'OP_USER_BLOCK_AND_UNBLOCK'),
  );
}

const titleMap: Record<Service | 'users', string> = {
  news: 'خبرگزاری',
  users: 'کاربران',
};

export default function AuthDialogController(props: Props) {
  const profile = useProfile({ throwOnError: false, retry: 0 });
  const url = props.service
    ? `${getScopeUrl(props.scopeId)}/${props.service}`
    : `${getScopeUrl(props.scopeId)}/management/users`;
  const managementTitle = titleMap[props.service || 'users'];

  return profile && hasManagementPermission(profile, props) ? (
    <Link role="button" className="btn-link" href={url}>
      مدیریت {managementTitle}
    </Link>
  ) : null;
}
