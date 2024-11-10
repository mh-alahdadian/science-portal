import { getParsedToken } from '@/api';
import { Permission } from '@/constants';
import { createFileUrl } from '@/utils';
import { LockKey } from '@phosphor-icons/react';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  scope: Schema<'ScopeDTO'>;
}

function hasAccess(scopeId: number, permission?: Permission) {
  if (scopeId == 0) return true;
  const parsed = getParsedToken();
  if (!parsed) return false;
  const authorities = parsed.authorities[scopeId || 'global'];
  if (!authorities) return false;
  return !permission || authorities.includes(permission);
}

export default function ScopeCard({ scope }: Props) {
  const _hasAccess = hasAccess(scope.id!);
  return (
    <Link
      href={`/scope/${scope.id}`}
      className="card card-body flex flex-col justify-between items-center gap-5 max-w-sm"
    >
      <img
        src={createFileUrl(scope.coverImage, scope.fileKey)}
        className={clsx('w-80 h-80 object-contain', !_hasAccess && 'blur-sm opacity-50')}
      />
      {scope.title}
      {!_hasAccess && <LockKey weight="fill" className="absolute top-32" size={80} />}
    </Link>
  );
}
