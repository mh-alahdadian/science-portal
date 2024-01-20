'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthDialogProps } from './types';

type FormData = Schema<'RegisterRequestDTO'>;

export default function SignupDialog({ setDialog }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register } = useForm<FormData>({});

  const { mutate: registerMutate } = useMutation(mutateService('post', 'core:/auth/register'));

  const handleSignup = handleSubmit((data) => {
    registerMutate(
      { body: data },
      {
        onSuccess(data, variables, context) {
          setDialog('login');
          toast.success('ثبت نام با موفقیت انجام شد.');
        },
      },
    );
  });

  const endAdornment = (
    <button className="btn btn-circle" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? "hide" : "show"}
    </button>
  );

  return (
    <div className="flex h-full justify-center items-center ">
      <div className="flex flex-col gap-5  max-w-xs w-full">
        <h3>ورود</h3>
        <TextField {...register('username')} label="نام کاربری" />
        <TextField
          {...register('password')}
          label="رمز عبور"
          type={showPassword ? undefined : 'password'}
          endAdornment={endAdornment}
        />
        <TextField {...register('firstName')} label="نام" />
        <TextField {...register('lastName')} label="نام‌خانوادگی" />
        <TextField {...register('email')} label="ایمیل" />
        <TextField {...register('phoneNumber')} label="شماره موبایل" />
        <button className="btn btn-primary" onClick={handleSignup}>
          ثبت نام
        </button>
      </div>
    </div>
  );
}
