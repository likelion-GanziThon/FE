import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller, FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Camera, ChevronDownIcon } from 'lucide-react';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import RegionFieldGroup from '@/components/RegionFieldGroup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useGetMe, useUpdateProfile } from '@/hooks/queries/useProfile';
import { toast } from 'sonner';
import { logOnDev } from '@/utils/logOnDev';
import GlobalLoader from '@/components/common/GlobalLoader';
import { useNavigate } from 'react-router';

interface ProfileUpdateFormValues {
  image: File | null;
  previewImage: string;
  name: string;
  region1: string | null;
  region2: string | null;
  date: string | null; // 2025-11-20
  description: string | null;
}

export default function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: user, isLoading } = useGetMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success('프로필 정보가 수정되었습니다.', { position: 'bottom-center' });
      navigate(`/profile/${user?.id}`);
    },
    onError: (error) => {
      logOnDev(error.message);
      toast.error('프로필 수정 중 문제가 발생했습니다.', { position: 'top-center' });
    },
  });

  // 명세서 양식에 맞추기
  const areaParts = user?.desiredArea?.split(' ') || [];
  const region1 = areaParts[0] || '';
  const region2 = areaParts[1] || '';

  // 초기값은 기존 데이터를 받는다.
  const profileUpdateForm = useForm<ProfileUpdateFormValues>({
    defaultValues: {
      image: null,
      previewImage: `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`,
      name: user?.nickname,
      region1: region1,
      region2: region2,
      date: user?.desiredMoveInDate,
      description: user?.introduction,
    },
  });

  const {
    control,
    register,
    formState: { errors },
    setValue,
    reset,
  } = profileUpdateForm;

  const previewImage = useWatch({ control, name: 'previewImage' });

  // 제출 핸들러
  const onSubmit: SubmitHandler<ProfileUpdateFormValues> = (values) => {
    const desiredArea = [values.region1, values.region2].join(' ');
    const body = {
      desiredArea: desiredArea,
      desiredMoveInDate: values.date,
      introduction: values.description,
      profileImageUrl: values.image,
    };

    updateProfile(body);
  };
  useEffect(() => {
    if (user) {
      const areaParts = user.desiredArea?.split(' ') || [];

      reset({
        image: null, // 파일은 서버에서 받을 수 없으므로 null 유지
        previewImage: `${import.meta.env.VITE_API_URL}${user.profileImageUrl}`,
        name: user.nickname,
        region1: areaParts[0] || '',
        region2: areaParts[1] || '',
        date: user.desiredMoveInDate,
        description: user.introduction,
      });
    }
  }, [user, reset]);

  if (isLoading || !user) return <GlobalLoader />;

  //TODO: 이미지 메모리 누수 작업
  return (
    <FormProvider {...profileUpdateForm}>
      <form
        onSubmit={profileUpdateForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-10 p-8'>
        <FieldSet disabled={isPending}>
          <div className='flex items-center gap-14'>
            <Controller
              name='image'
              control={control}
              render={({ field: { onChange } }) => (
                <div className='flex flex-col gap-2'>
                  <Avatar className='size-25'>
                    <AvatarImage src={previewImage} />
                    <AvatarFallback>profile</AvatarFallback>
                  </Avatar>
                  <Input
                    type='file'
                    className='hidden'
                    accept='image/*' // 파일 선택 창에서 이미지 파일만 보이도록 필터링
                    id='image' // 버튼 연결
                    onChange={(e) => {
                      const file = e.target.files?.[0]; // blob URL 생성
                      if (!file) return; // 이거 있어야 취소 눌렀을 때 기존 이미지가 유지된다.

                      onChange(file); // 파일 자체는 필드에 저장
                      const blobURL = file ? URL.createObjectURL(file) : '';
                      setValue('previewImage', blobURL); // // 폼 데이터용 데이터 변경
                    }}
                  />
                  <Button asChild>
                    <Label
                      htmlFor='image' // input file 연결
                      className='rounded-2xl'>
                      <Camera className='size-4' />
                      변경
                    </Label>
                  </Button>
                </div>
              )}
            />

            <Field data-invalid={!!errors.name}>
              <Input
                aria-invalid={!!errors.name}
                type='text'
                {...register('name', { required: '필수 항목입니다.' })}
                className='flex text-2xl'
              />
              {errors.name && <FieldError errors={[errors.name]} />}
            </Field>
          </div>

          <Field>
            <FieldLabel className='w-32 text-xl'>희망 거주 지역</FieldLabel>
            <RegionFieldGroup
              region1='region1'
              region2='region2'
            />
          </Field>
          <Controller
            control={control}
            name='date'
            render={({ field: { value, onChange } }) => {
              const stringToDate = value ? new Date(value) : undefined; // 문자열 -> Date객체
              return (
                <Field>
                  <FieldLabel
                    htmlFor='date'
                    className='w-32 text-xl'>
                    희망 입주 시기
                  </FieldLabel>
                  <Popover
                    open={open}
                    onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        id='date'
                        className='w-48 justify-between font-normal'>
                        {value || '날짜를 선택해주세요.'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto overflow-hidden p-0'
                      align='start'>
                      <Calendar
                        mode='single'
                        selected={stringToDate ?? undefined}
                        captionLayout='dropdown'
                        onSelect={(data) => {
                          if (!data) {
                            return;
                          }
                          // Date객체 -> 문자열
                          const year = data.getFullYear();
                          const month = String(data.getMonth() + 1).padStart(2, '0');
                          const day = String(data.getDate()).padStart(2, '0');
                          const localDateString = `${year}-${month}-${day}`;
                          onChange(localDateString);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              );
            }}
          />
          <FieldLabel className='text-xl'>자기소개</FieldLabel>
          <Field data-invalid={!!errors.description}>
            <Textarea
              aria-invalid={!!errors.description}
              //whitespace-pre-line :줄바꿈 문자 기준으로 실제 줄이 바뀜
              className='whitespace-pre-line'
              {...register('description', { required: '필수 항목입니다.' })}
            />
            {errors.description && <FieldError errors={[errors.description]} />}
          </Field>
          <Button
            type='submit'
            className='w-30 self-center'>
            수정 완료
          </Button>
        </FieldSet>
      </form>
    </FormProvider>
  );
}
