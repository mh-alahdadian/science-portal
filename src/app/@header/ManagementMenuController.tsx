'use client';

import { getParsedToken } from '@/api';
import { Permission, Service } from '@/constants';
import { getScopeUrl } from '@/utils/scope';
import Link from 'next/link';
import { HeaderProps } from './types';

const servicesMap: Record<Service | 'users', { title: string; permission: Permission } | undefined> = {
  news: { title: 'خبرگزاری', permission: Permission.OP_PUBLISH_UNPUBLISH_NEWS },
  users: { title: 'کاربران', permission: Permission.OP_ADD_ROLE_TO_USER },
};

export default function AuthDialogController(props: HeaderProps) {
  const url = props.service
    ? `${getScopeUrl(props.scopeId)}/${props.service}/admin`
    : `${getScopeUrl(props.scopeId)}/management/users`;

  const serviceInfo = servicesMap[props.service || 'users'];
  const authorities = getParsedToken().authorities[props.scopeId || 'global'];
  if (!serviceInfo || !authorities || !authorities.includes(serviceInfo.permission)) return null;

  return (
    <Link role="button" className="btn-link" href={url}>
      مدیریت {serviceInfo.title}
    </Link>
  );
}
