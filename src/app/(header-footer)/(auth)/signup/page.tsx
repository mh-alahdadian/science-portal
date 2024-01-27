'use client';

import { mutateService } from '@/api';
import { TextField } from '@/components';
import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation'
import { CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoginIllustration from '../assets/Login-Illustration.svg';
import { containerStyles } from '../styles';

type FormData = Schema<'RegisterRequestDTO'>;

export default function SignupDialog() {
  const [showPassword, setShowPassword] = useState(false);
  const { control, formState, handleSubmit, register } = useForm<FormData>({});

  const { mutate: registerMutate } = useMutation(mutateService('post', 'core:/auth/register'));

  const handleSignup = handleSubmit((data) => {
    registerMutate(
      { body: data },
      {
        onSuccess(data, variables, context) {
          Router.push('login');
          toast.success('ثبت نام با موفقیت انجام شد.');
        },
      },
    );
  });

  const endAdornment = (
    <button className="btn btn-circle" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? 'hide' : 'show'}
    </button>
  );

  return (
    <div className="container w-full h-full justify-between bg-neutral">
      <style jsx>{containerStyles}</style>
      <Link href="/" className="btn btn-transparent col-span-full justify-self-start">
        <CaretRight />
        <span className="text-lg font-medium">بازگشت به خانه</span>
      </Link>
      <div className="gap-6 w-full bg-white card-body">
        <h3 className="font-bold text-[26px]">ورود</h3>
        <TextField {...register('phoneNumber')} label="شماره موبایل" />
        <TextField
          {...register('username')}
          label="نام کاربری"
          helperText="نام کاربری یک عبارتی است یکتا به زبان انگلیسی"
        />
        <TextField
          {...register('password')}
          label="رمز عبور"
          type={showPassword ? undefined : 'password'}
          endAdornment={endAdornment && <></>}
        />
        <button className="btn btn-primary" onClick={handleSignup}>
          ثبت نام
        </button>
        <div className='flex justify-between text-sm'>
          <span>حساب کاربری دارم</span>
          <Link href="/login" className='link'>ورود</Link>
        </div>
      </div>
      <LoginIllustration />
    </div>
  );
}
