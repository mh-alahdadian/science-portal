'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthDialogProps } from './types';

type FormData = Schema<'PasswordLoginRequestDTO' | 'VerifyCodeLoginRequestDTO'>;

type Method = 'password' | 'verify-code';

export default function LoginDialog({ setDialog }: AuthDialogProps) {
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
    <div className="flex h-full justify-center items-center ">
      <div className="flex flex-col gap-5  max-w-xs w-full">
        <h3>ورود</h3>
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
          <TextField {...register('password')} formControlClassName='w-full' label="رمز عبور" type="password" />
        )}
        <button className='w-full btn btn-primary' onClick={handleLogin}>
          ورود
        </button>
        <button type="button" className='w-full btn btn-link btn-primary' onClick={toggleMethod}>
          {isOtpMode ? 'ورود با رمز' : 'ورود با رمز یکبار مصرف'}
        </button>
        <button type="button" className='w-full btn btn-link btn-primary' onClick={() => setDialog('signup')}>
          ثبت نام
        </button>
      </div>
    </div>
  );
}
