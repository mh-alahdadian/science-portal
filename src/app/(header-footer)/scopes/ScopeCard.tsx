import { getParsedToken, mutateService, queryService } from '@/api';
import { Permission } from '@/constants';
import { createFileUrl } from '@/utils';
import { LockKey } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { toast } from 'react-toastify';

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
  const isLoggedIn = getParsedToken();
  const _hasAccess = hasAccess(scope.id!);
  const queryClient = useQueryClient();
  const requests = useQuery(queryService('core:/v1/membership-requests', {}));
  const { mutate: mutateMembershipRequest } = useMutation({
    ...mutateService('post', 'core:/v1/membership-requests'),
    onSuccess() {
      toast.success('درخواست شما ثبت شد.');
      queryClient.invalidateQueries({ queryKey: queryService('core:/v1/membership-requests', {}).queryKey });
    },
    onError(e: any) {
      toast.error(e.message);
    },
  });

  const Component = _hasAccess ? Link : 'div';

  const membershipElement = requests.data?.find((x) => x.scopeId == scope.id!) ? (
    <button className="btn-accent btn-outline min-w-40">در انتظار تایید</button>
  ) : (
    <button
      className="btn-primary min-w-40"
      onClick={() => {
        mutateMembershipRequest({ body: { scopeId: scope.id } });
      }}
    >
      عضویت
    </button>
  );

  return (
    <Component
      href={`/scope/${scope.id}`}
      className="card card-body flex flex-col justify-evenly items-center gap-5 max-w-sm pb-4"
    >
      <img
        src={createFileUrl(scope.coverImage, scope.fileKey)}
        className={clsx('w-80 h-80 object-contain', !_hasAccess && 'blur-sm opacity-50')}
      />
      <div className="text-2xl mb-auto">{scope.title}</div>
      {!_hasAccess && <LockKey weight="fill" className="absolute top-32" size={80} />}
      {isLoggedIn && !_hasAccess && membershipElement}
    </Component>
  );
}
