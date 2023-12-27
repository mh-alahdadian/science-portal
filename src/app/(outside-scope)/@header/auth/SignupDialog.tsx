'use client';

import { mutateService } from '@/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputProps, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { components } from 'src/generated/core';
import { AuthDialogProps } from './types';
import { toast } from 'react-toastify';

type FormData = components['schemas']['RegisterRequestDTO'];

export default function SignupDialog({ setDialog }: AuthDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register } = useForm<FormData>({});

  const { mutate: registerMutate } = useMutation(mutateService('post', 'core:/auth/register'));

  const handleSignup = handleSubmit((data) => {
    registerMutate({ body: data }, {
      onSuccess(data, variables, context) {
        setDialog('login')
        toast.success('ثبت نام با موفقیت انجام شد.')
      },
    });
  });

  const passwordProps: InputProps = {
    endAdornment: (
      <IconButton onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    ),
  };

  return (
    <div className="flex h-full justify-center items-center ">
      <div className="flex flex-col gap-5  max-w-xs w-full">
        <Typography variant="h3">ورود</Typography>
        <TextField {...register('username')} fullWidth label="نام کاربری" />
        <TextField
          {...register('password')}
          fullWidth
          label="رمز عبور"
          type={showPassword ? undefined : 'password'}
          InputProps={passwordProps}
        />
        <TextField {...register('firstName')} fullWidth label="نام" />
        <TextField {...register('lastName')} fullWidth label="نام‌خانوادگی" />
        <TextField {...register('email')} fullWidth label="ایمیل" />
        <TextField {...register('phoneNumber')} fullWidth label="شماره موبایل" />
        <Button fullWidth variant="contained" color="primary" onClick={handleSignup}>
          ثبت نام
        </Button>
      </div>
    </div>
  );
}
