import { mutateService } from '@/api';
import { User } from '@phosphor-icons/react';
import { TextField } from '@service/components';
import { createFileUrl, formatDateTime } from '@service/utils';
import { useMutation } from '@tanstack/react-query';
import { pick } from 'ramda';
import { useForm } from 'react-hook-form';

interface Props {
  profile: Schema<'UserInfoDTO'>;
}

export function PersonalInfo(props: Props) {
  const { profile } = props;

  const { mutateAsync: mutateProfile } = useMutation(mutateService('put', 'core:/v1/users/profile'));
  const { register, handleSubmit } = useForm({
    defaultValues: profile,
  });

  const submit = handleSubmit((data) => {
    mutateProfile({
      body: pick(
        [
          'firstName',
          'lastName',
          'coverImage',
          'birthDay',
          'email',
          'verifyEmailCode',
          'job',
          'education',
          'orientation',
        ],
        data
      ),
    });
  });

  const image = profile.coverImage ? (
    <img width={120} height={120} src={createFileUrl(profile.coverImage, profile.fileKey)} className="object-fill" />
  ) : (
    <User size={120} />
  );
  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <div className="flex items-center gap-6">
        <div className="avatar">{image}</div>
        <div className="flex flex-col gap-4">
          <div>نام کاربری</div>
          <div>
            <span className="text-black text-opacity-50 me-2">تاریخ عضویت</span>
            {formatDateTime(Date.now())}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <TextField {...register('firstName')} label="نام" />
        <TextField {...register('lastName')} label="نام نام خانوادگی" />
        <TextField {...register('birthDay')} label="تاریخ تولد" />
        <TextField {...register('education')} label="تحصیلات" />
        <TextField {...register('job')} label="شماره موبایل" />
        <TextField {...register('email')} label="ایمیل" />
      </div>
      <div className="card-actions w-full gap-6">
        <button className="btn-neutral flex-1">انصراف</button>
        <button className="btn-primary flex-1">ذخیره</button>
      </div>
    </form>
  );
}
