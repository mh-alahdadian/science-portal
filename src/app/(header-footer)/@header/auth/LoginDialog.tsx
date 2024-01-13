'use client';

import { mutateService } from '@/api';
import { Button, InputProps, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { components } from 'src/generated/core';
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

  const verifyCodeProps: InputProps = {
    endAdornment: (
      <Button size="small" variant="contained" onClick={requestVerifyCode} className="text-xs">
        دریافت رمز عبور
      </Button>
    ),
  };

  return (
    <div className="flex h-full justify-center items-center ">
      <div className="flex flex-col gap-5  max-w-xs w-full">
        <Typography variant="h3">ورود</Typography>
        <TextField {...register('username')} fullWidth label="نام کاربری" />
        {isOtpMode ? (
          <TextField
            {...register('verifyCode')}
            fullWidth
            label="رمز عبور یکبار مصرف"
            type="password"
            InputProps={verifyCodeProps}
          />
        ) : (
          <TextField {...register('password')} fullWidth label="رمز عبور" type="password" />
        )}
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
          ورود
        </Button>
        <Button type="button" variant="text" color="primary" onClick={toggleMethod}>
          {isOtpMode ? 'ورود با رمز' : 'ورود با رمز یکبار مصرف'}
        </Button>
        <Button type="button" variant="text" color="primary" onClick={() => setDialog('signup')}>
          ثبت نام
        </Button>
      </div>
    </div>
  );
}
