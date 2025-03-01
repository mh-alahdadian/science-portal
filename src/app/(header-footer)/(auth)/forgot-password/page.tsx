'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-toastify';

type FormData = Schema<'ChangePasswordDTO'>;

export default function ForgotPassword(props: PageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register, getValues, watch } = useForm<FormData>({});
  const { minutes, seconds, isRunning: isTimerOn, restart } = useTimer({ expiryTimestamp: new Date() });
  const router = useRouter();

  const { mutate: resetPassword } = useMutation(mutateService('post', 'core:/v1/auth/new-password'));
  const { mutate: sendVerifyCode } = useMutation(
    mutateService('post', 'core:/v1/auth/forget-password/send-verify-code')
  );

  const handleResetPassword = handleSubmit((data) => {
    if (!data.verifyCode && data.username) {
      sendVerifyCode({ params: { query: { username: data.username } } });
    }
    resetPassword(
      { body: data },
      {
        onSuccess(data, variables, context) {
          router.push('/login');
          toast.success('رمز عبور شما با موفقیت تغییر کرد.');
        },
        onError(error: any) {
          toast.error(error.message);
        },
      }
    );
  });

  return (
    <>
      <h3 className="font-bold text-[26px]">تغییر رمز عبور</h3>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="نام کاربری"
            endAdornment={
              <button
                className={clsx('btn-sm btn-accent', isTimerOn && 'btn-outline w-16')}
                disabled={!field.value || isTimerOn}
                onClick={() => {
                  restart(new Date(Date.now() + 120_000), true);
                  sendVerifyCode({ params: { query: { username: field.value } } });
                }}
              >
                {!isTimerOn
                  ? 'دریافت کد'
                  : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
              </button>
            }
          />
        )}
      />
      <TextField {...register('verifyCode')} label="کد یکبار مصرف" />
      <TextField
        {...register('password')}
        label="رمز عبور"
        type={showPassword ? undefined : 'password'}
        endAdornment={
          <button className="btn-circle btn-sm btn-transparent" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
          </button>
        }
      />
      <button className="btn-primary" onClick={handleResetPassword}>
        تغییر رمز عبور
      </button>
    </>
  );
}
