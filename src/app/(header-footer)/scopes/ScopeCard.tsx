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
      queryClient.invalidateQueries({
        queryKey: queryService('core:/v1/membership-requests', {}).queryKey,
      });
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
      href={_hasAccess ? `/scope/${scope.id}` : undefined}
      className="card card-body flex flex-col justify-between items-center gap-5 max-w-sm p-6"
    >
      <div className="relative w-full">
        <img
          src={createFileUrl(scope.coverImage, scope.fileKey)}
          alt={scope.title}
          className={clsx('w-full h-80 object-contain rounded-lg', !_hasAccess && 'blur-sm opacity-50')}
        />
        {!_hasAccess && (
          <LockKey
            weight="fill"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            size={80}
          />
        )}
      </div>

      <div className="w-full text-center">
        <h3 className="text-2xl font-semibold mb-2">{scope.title}</h3>
        {scope.description && <p className="text-gray-600 mb-4">{scope.description}</p>}
      </div>

      <div className="flex justify-between w-full text-sm text-gray-500 mb-4">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{scope.usersCount || 10}</span>
          <span>کاربران</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">{scope.newsCount || 7}</span>
          <span>اخبار</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">{scope.topicsCount || 5}</span>
          <span>موضوعات</span>
        </div>
      </div>

      {isLoggedIn && !_hasAccess && membershipElement}
    </Component>
  );
}
