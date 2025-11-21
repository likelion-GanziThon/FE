import { useForm, type SubmitHandler } from 'react-hook-form';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useLogin } from '@/hooks/queries/useAuth';
import { toast } from 'sonner';
import { logOnDev } from '@/utils/logOnDev';
import GlobalLoader from '@/components/common/GlobalLoader';
import homeLogo from '@/assets/home.png';

type FormValues = {
  id: string;
  password: string;
};

export default function LoginPage() {
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
  const { mutate: login, isPending } = useLogin({
    onSuccess: () => {
      toast.success('환영합니다.', { position: 'top-center' });
    },
    onError: (error) => {
      logOnDev(error.message);
      toast.error('아이디, 비밀번호를 확인해주세요.', { position: 'top-center' });
    },
  });

  //제출 핸들러
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    login(data);
  };

  if (isPending) return <GlobalLoader />;

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex items-center justify-center gap-5 px-20 py-20'>
        <img
          src={homeLogo}
          alt='logo'
          className='w-15'
        />
        <span className='text-3xl font-bold'>홈메이트</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 px-10'>
        <FieldSet
          className='gap-6'
          disabled={isPending}>
          <Field data-invalid={!!errors.id}>
            <FieldLabel htmlFor='id'>아이디 (닉네임)</FieldLabel>
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

          <Button
            type='submit'
            className='bg-home-orange-600 hover:bg-home-orange-300 w-1/2 self-center font-bold'>
            로그인
          </Button>
        </FieldSet>

        <Button
          variant={'link'}
          className='relative h-auto self-center p-0 font-normal no-underline after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:-translate-x-1/2 after:bg-current after:transition-[width] after:duration-300 after:ease-in-out hover:no-underline hover:after:w-full'
          asChild>
          <Link to={'/sign-up'}>계정이 없으신가요?</Link>
        </Button>
      </form>
    </div>
  );
}
