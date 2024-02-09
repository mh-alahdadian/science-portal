'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { CaretLeft } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = Schema<'PasswordLoginRequestDTO' | 'VerifyCodeLoginRequestDTO'>;

type Method = 'password' | 'verify-code';

export default function LoginDialog(props: PageProps) {
  const [method, setMethod] = useState<Method>('password');
  const isOtpMode = method === 'verify-code';

  const { control, formState, handleSubmit, register } = useForm<FormData>({});

  const { mutate: requestVerifyCodeMutate } = useMutation(mutateService('post', 'core:/auth/change-login-type'));
  const { mutate: loginPasswordMutate } = useMutation(mutateService('post', 'core:/auth/login/password'));
  const { mutate: loginVerifyCodeMutate } = useMutation(mutateService('post', 'core:/auth/login/verify-code'));

  const toggleMethod = () => {
    setMethod(isOtpMode ? 'password' : 'verify-code');
  };

  const handleLogin = handleSubmit((data) => {
    if (isOtpMode) {
      loginVerifyCodeMutate({ body: data as any });
    } else {
      loginPasswordMutate({ body: data as any });
    }
  });

  const requestVerifyCode = handleSubmit((data) => {
    requestVerifyCodeMutate({ body: { username: data.username } });
  });

  const endAdornment = (
    <button className="btn btn-sm text-xs" onClick={requestVerifyCode}>
      دریافت رمز عبور
    </button>
  );

  return (
    <>
      <h3 className="font-bold text-[26px]">ورود</h3>
      <TextField {...register('username')} className="w-full" label="نام کاربری" />
      {isOtpMode ? (
        <TextField
          {...register('verifyCode')}
          className="w-full"
          label="رمز عبور یکبار مصرف"
          type="password"
          endAdornment={endAdornment}
        />
      ) : (
        <TextField {...register('password')} formControlClassName="w-full" label="رمز عبور" type="password" />
      )}
      <Link href="/forgot-password" type="button" className="text-sm mr-auto">
        رمز عبور خود را فراموش کردم
      </Link>
      <button className="w-full btn btn-primary" onClick={handleLogin}>
        ورود
        <CaretLeft />
      </button>
      {/* <button type="button" className="w-full btn btn-link btn-primary" onClick={toggleMethod}>
          {isOtpMode ? 'ورود با رمز' : 'ورود با رمز یکبار مصرف'}
        </button> */}
      <div className="flex justify-between text-sm">
        <span>حساب کاربری ندارم</span>
        <Link href="/signup" type="button" className="link">
          ثبت نام
        </Link>
      </div>
    </>
  );
}
