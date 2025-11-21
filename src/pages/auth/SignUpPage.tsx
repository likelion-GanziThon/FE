import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel, FieldSeparator, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSignup } from '@/hooks/queries/useAuth';
import { logOnDev } from '@/utils/logOnDev';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

type FormValues = {
  id: string;
  password: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: '',
      password: '',
    },
    mode: 'onChange',
  });
  const { mutate: signUp, isPending } = useSignup({
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.', { position: 'top-center' });
      // 로그인 페이지로 이동
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      logOnDev(error.message);
      toast.error('회원가입 중 문제가 발생하였습니다.', { position: 'top-center' });
    },
  });

  //제출 핸들러
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp(data);
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='px-20 py-15 text-center text-5xl'>홈메이트</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-10'>
        <FieldSet
          className='gap-6'
          disabled={isPending}>
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

          <Button type='submit'>회원가입</Button>
          <FieldSeparator />
          <Button
            variant={'link'}
            asChild>
            <Link to={'/login'}>이미 계정이 있다면</Link>
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}
