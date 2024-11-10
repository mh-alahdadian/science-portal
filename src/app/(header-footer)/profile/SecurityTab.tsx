import { mutateService } from '@/api';
import { TextField } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface SecurityFormInputs {
  previousPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

export default function SecurityTab() {
  const { mutateAsync: mutatePassword } = useMutation(mutateService('post', 'core:/v1/auth/new-password'));
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isDirty, errors }
  } = useForm<SecurityFormInputs>();

  const submit = handleSubmit(async (data) => {
    // await mutatePassword({
    //   body: {
    //     password: data.newPassword,
    //     username: 
    //   }
    // });

    // reset();
  });

  const isSaveDisabled = !isDirty || errors.newPassword || errors.repeatNewPassword;

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <div className="grid gap-6">
        <div>
          <label htmlFor="previousPassword" className="label">رمز عبور قبلی</label>
          <TextField
            type="password"
            id="previousPassword"
            {...register('previousPassword', { required: 'این فیلد الزامی است' })}
            className={`input ${errors.previousPassword ? 'is-invalid' : ''}`}
          />
          {errors.previousPassword && <span className="error">{errors.previousPassword.message}</span>}
        </div>

        <div>
          <label htmlFor="newPassword" className="label">رمز عبور جدید</label>
          <TextField
            type="password"
            id="newPassword"
            {...register('newPassword', {
              required: 'این فیلد الزامی است',
              minLength: {
                value: 6,
                message: 'رمز عبور باید حداقل 6 کاراکتر باشد'
              }
            })}
            className={`input ${errors.newPassword ? 'is-invalid' : ''}`}
          />
          {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
        </div>

        <div>
          <label htmlFor="repeatNewPassword" className="label">تکرار رمز عبور جدید</label>
          <TextField
            type="password"
            id="repeatNewPassword"
            {...register('repeatNewPassword', {
              required: 'این فیلد الزامی است',
              validate: (value) =>
                value === getValues('newPassword') || 'رمز عبور جدید و تکرار آن مطابقت ندارند'
            })}
            className={`input ${errors.repeatNewPassword ? 'is-invalid' : ''}`}
          />
          {errors.repeatNewPassword && <span className="error">{errors.repeatNewPassword.message}</span>}
        </div>
      </div>

      <div className="card-actions w-full gap-6">
        <button type="button" className="btn-neutral flex-1" onClick={() => reset()}>انصراف</button>
        <button type="submit" className="btn-primary flex-1" disabled={!!isSaveDisabled}>ذخیره</button>
      </div>
    </form>
  );
}
