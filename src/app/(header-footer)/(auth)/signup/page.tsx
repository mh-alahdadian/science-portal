'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTimer } from 'react-timer-hook';
import { toast } from 'react-toastify';

type FormData = Schema<'RegisterRequestDTO'>;

export default function SignupDialog(props: PageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register, getValues, watch } = useForm<FormData>({});
  const { minutes, seconds, isRunning: isTimerOn, restart } = useTimer({ expiryTimestamp: new Date() });

  const { mutate: registerMutate } = useMutation(mutateService('post', 'core:/v1/auth/register'));
  const { mutate: sendVerifyCode } = useMutation(
    mutateService('post', 'core:/v1/auth/register/send-verify-code/{phoneNumber}')
  );

  const handleSignup = handleSubmit((data) => {
    if (!data.verifyCode && data.phoneNumber) {
      sendVerifyCode({ params: { path: { phoneNumber: data.phoneNumber } } });
    }
    registerMutate(
      { body: data },
      {
        onSuccess(data, variables, context) {
          // Router.push('login');
          toast.success('ثبت نام با موفقیت انجام شد.');
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
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onChange={(event) => {
              const value = event.target.value;
              if (value.match(/^\d*$/)) {
                field.onChange(value);
              }
            }}
            label="شماره موبایل"
            type="tel"
            endAdornment={
              <button
                className={clsx('btn-sm btn-accent', isTimerOn && 'btn-outline w-16')}
                disabled={!field.value || isTimerOn}
                onClick={() => {
                  restart(new Date(Date.now() + 120_000), true);
                  sendVerifyCode({ params: { path: { phoneNumber: field.value! } } });
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
      <TextField
        {...register('username')}
        label="نام کاربری"
        helperText="نام کاربری یک عبارتی است یکتا به زبان انگلیسی"
      />
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
      {<TextField {...register('verifyCode')} label="کد یکبار مصرف" />}
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
