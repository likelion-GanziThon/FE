import { useForm, type SubmitHandler } from 'react-hook-form';
import { Field, FieldError, FieldLabel, FieldSeparator, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

type FormValues = {
  id: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
    mode: 'onChange',
  });

  //제출 핸들러
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='px-20 py-15 text-center text-5xl'>홈메이트</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-10'>
        <FieldSet
          className='gap-6'
          disabled={isSubmitting}>
          <Field data-invalid={!!errors.id}>
            <FieldLabel htmlFor='id'>아이디</FieldLabel>
            <Input
              id='id'
              aria-invalid={!!errors.id}
              type='text'
              placeholder='아이디를 입력하세요.'
              {...register('id', { required: '필수 항목입니다.' })}
            />
            {errors.id && <FieldError errors={[errors.id]} />}
          </Field>
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor='password'>비밀번호</FieldLabel>
            <Input
              id='password'
              placeholder='비밀번호를 입력하세요.'
              aria-invalid={!!errors.password}
              type='password'
              {...register('password', { required: '필수 항목입니다.' })}
            />
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          <Button type='submit'>로그인</Button>
          <FieldSeparator />
          <Button
            variant={'secondary'}
            asChild>
            <Link to={'/sign-up'}>회원가입</Link>
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
