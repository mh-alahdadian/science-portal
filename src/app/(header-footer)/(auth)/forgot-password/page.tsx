'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormData = Schema<'ChangePasswordDTO'>;

export default function SignupDialog(props: PageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register, getValues, watch } = useForm<FormData>({});
  const router = useRouter()

  const { mutate: resetPassword } = useMutation(mutateService('post', 'core:/v1/auth/new-password'));
  const { mutate: sendVerifyCode } = useMutation(
    mutateService('post', 'core:/v1/auth/forget-password/send-verify-code')
  );

  const handleSignup = handleSubmit((data) => {
    if (!data.verifyCode && data.username) {
      sendVerifyCode({ params: { query: { username: data.username } } });
    }
    resetPassword(
      { body: data },
      {
        onSuccess(data, variables, context) {
          router.push('/login')
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
      <h3 className="font-bold text-[26px]">ورود</h3>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="نام کاربری"
            endAdornment={
              <button
                className="btn-sm btn-accent"
                disabled={!field.value}
                onClick={() => sendVerifyCode({ params: { query: { username: field.value } } })}
              >
                دریافت کد
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
      <button className="btn-primary" onClick={handleSignup}>
        ثبت نام
      </button>
      <div className="flex justify-between text-sm">
        <span>حساب کاربری دارم</span>
        <Link href="/login" className="link">
          ورود
        </Link>
      </div>
    </>
  );
}
