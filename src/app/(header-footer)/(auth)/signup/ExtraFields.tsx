import { TextField } from '@/components';

interface Props {
  register: Function;
}

function SignupExtraFields(props: Props) {
  return (
    <>
      <TextField {...props.register('firstName')} label="نام" />
      <TextField {...props.register('lastName')} label="نام‌خانوادگی" />
      <TextField {...props.register('email')} label="ایمیل" />
    </>
  );
}
