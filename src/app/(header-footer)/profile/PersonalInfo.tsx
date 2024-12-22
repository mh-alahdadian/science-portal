import { mutateService, queryService } from '@/api';
import { SelectField, TextField } from '@/components';
import { createFileUrl, formatDateTime } from '@/utils';
import { User } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface Props {
  profile: Schema<'UserInfoDTO'>;
}

export function PersonalInfo(props: Props) {
  const { profile } = props;

  const queryClient = useQueryClient();
  const { mutateAsync: mutateProfile } = useMutation(mutateService('put', 'core:/v1/users/profile'));
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: profile,
  });

  const submit = handleSubmit((data) => {
    return mutateProfile({
      body: data,
    }).then((x) => queryClient.invalidateQueries(queryService('core:/v1/users/profile', {})));
  });
  const isSaveDisabled = !isDirty;

  const image = profile.coverImage ? (
    <img src={createFileUrl(profile.coverImage, profile.fileKey)} />
  ) : (
    <User size={128} />
  );
  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <div className="flex items-center gap-6">
        <div className="avatar w-32 h-32 border-2 overflow-hidden rounded-full">{image}</div>
        <div className="flex flex-col gap-4">
          <span className="font-extrabold text-2xl">نام کاربری</span>
          <div>
            <span className="text-black text-opacity-50 me-2">تاریخ عضویت</span>
            {formatDateTime((profile as any).createdAt || Date.now())}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <TextField {...register('firstName')} label="نام" />
        <TextField {...register('lastName')} label="نام خانوادگی" />
        <TextField {...register('birthDay')} label="تاریخ تولد" />
        <SelectField {...register('education')} label="تحصیلات">
          <option value={1}>زیر دیپلم</option>
          <option value={2}>دیپلم</option>
          <option value={3}>لیسانس</option>
          <option value={4}>فوق لیسانس</option>
          <option value={5}>دکتری</option>
        </SelectField>
        <TextField {...register('job')} label="شغل" />
        <TextField {...register('email')} label="ایمیل" />
      </div>
      <div className="card-actions w-full gap-6">
        <button className="btn-neutral flex-1" onClick={() => reset(profile)}>
          انصراف
        </button>
        <button className="btn-primary flex-1" disabled={isSaveDisabled}>
          ذخیره
        </button>
      </div>
    </form>
  );
}
