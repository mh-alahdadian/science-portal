import { queryService } from '@/api';
import { createFileUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { indexBy, prop } from 'ramda';

interface Props {
  profile: Schema<'UserInfoDTO'>;
}

export function Roles(props: Props) {
  const { profile } = props;

  const { data: scopes } = useQuery({
    ...queryService('core:/v1/scopes', {}),
    select: (data) => indexBy(prop('id'), data),
  });

  if (!profile.userRoles?.length) return <div>شما هنوز در هیچ حوزه ای عضو نشده‌اید</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <span className="w-3/4">نام حوزه</span>
        <span className="w-1/4">تاریخ عضویت</span>
      </div>
      {profile.userRoles?.map((ur) => {
        const scope = scopes?.[ur.scopeId!]! || {};

        return (
          <div className="flex flex-col gap-2">
            <div className="w-3/4 flex gap-2">
              <img className="rounded-full object-cover w-8 h-8" src={createFileUrl(scope.coverImage, scope.fileKey)} />
              {scope.title}
            </div>
            <div className="w-1/4 flex gap-2">
              {ur.roles?.map((r) => (
                <div className="tag text-xs">{r.title}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
