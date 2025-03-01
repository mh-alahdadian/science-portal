import { mutateService, queryService } from '@/api';
import { X } from '@phosphor-icons/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { prop } from 'ramda';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type User = Schema<'UserInfoDTO'>;

interface Props {
  user: User;
  currentScope: number;
  onClose: Function;
}

const UserEditForm = ({ user, currentScope, onClose }: Props) => {
  const newRoleRef = useRef<HTMLSelectElement>(null);
  const [isEnabled, setIsEnabled] = useState(user.enable);
  const [roles, setRoles] = useState<Schema<'Role'>[]>(
    () => user.userRoles!.find((r) => r.scopeId == currentScope)?.roles || []
  );

  const { mutate: mutateUserRoles } = useMutation(
    mutateService('post', 'core:/v1/manager/{page}/users/{userId}/roles')
  );
  const { mutate: mutateUserEnable } = useMutation(
    mutateService('patch', 'core:/v1/manager/users/{userId}/block-unblock')
  );

  const allRoles = useSuspenseQuery(
    queryService('core:/v1/manager/{page}/roles', {
      params: { path: { page: String(currentScope) } },
    })
  ).data!;

  const { register, handleSubmit, control } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data: any) => {
    if (user.enable != isEnabled) {
      toggleEnabled();
    }

    const roleIds = roles.map(prop('id'));

    mutateUserRoles(
      {
        // backend will change roleIds to be in body
        params: {
          path: { page: String(currentScope), userId: data.id },
        } as any,
        body: { roleIds: roleIds as number[] } as any,
      },
      {
        onSuccess: () => {
          toast.success('بروز رسانی نقش‌ها با موفقیت انجام شد');
          onClose();
        },
      }
    );
  };

  const toggleEnabled = () => {
    mutateUserEnable(
      {
        params: {
          path: { userId: +user.id! },
        },
        headers: {
          // "Cache-Control": null,
          'Content-Type': null,
        },
      },
      {
        onSuccess: () => {
          toast.success('تغییرات با موفقیت انجام شد');
        },
      }
    );
  };

  const handleDeleteRole = (role: Schema<'Role'>) => {
    setRoles((prev) => {
      return prev.filter((item) => item.id != role.id);
    });
  };

  const handleAddRole = () => {
    const newRoleId = +newRoleRef.current!.value;
    const role = allRoles.find((x) => x.id === newRoleId)!;
    setRoles((prev) => [...prev, role]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ویرایش کاربر</h2>
      <div className="flex gap-5 mt-4">
        <span>نام:</span>
        <span>{user.firstName}</span>
      </div>
      <div className="flex gap-5 mt-4">
        <label>نام خانوادگی:</label>
        <span>{user.lastName}</span>
      </div>
      <div className="flex gap-5 mt-4">
        <label>آدرس ایمیل:</label>
        <span>{user.email}</span>
      </div>
      <div className="flex gap-5 mt-4">
        <label>شماره موبایل:</label>
        <span>{user.phoneNumber}</span>
      </div>
      <div className="flex gap-5 mt-4">
        <label>شغل:</label>
        <span>{user.job}</span>
      </div>
      <div className="flex gap-5 mt-4">
        <label>تحصیلات:</label>
        <span>{user.educationTitle}</span>
      </div>
      <div className="flex gap-5 items-center mt-4">
        <label>وضعیت حساب کاربری:</label>
        {isEnabled ? (
          <button type="button" onClick={() => setIsEnabled(false)} title="تغییر به غیرفعال" className="bg-primary">
            فعال
          </button>
        ) : (
          <button type="button" onClick={() => setIsEnabled(true)} title="تغییر به فعال" className="bg-error">
            غیرفعال
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <h3>نقش ها:</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((role, index) => {
            return (
              <div className="flex gap-2 items-center px-2 bg-slate-100 shadow-md" key={role.id}>
                <span>{role.title || ''}</span>
                <button onClick={() => handleDeleteRole(role)} className="flex w-min !h-2 p-1">
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-5 items-center mt-4">
        <h3>نقش جدید:</h3>
        <select ref={newRoleRef}>
          {allRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.description}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddRole}>
          اضافه کردن نقش
        </button>
      </div>

      <button className="mt-4" type="submit">
        ذخیره
      </button>
    </form>
  );
};

export default UserEditForm;
