import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card'; // Card 컴포넌트 추가
import { Controller, FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import {
  Camera,
  ChevronDownIcon,
  MapPin,
  Calendar as CalendarIcon,
  User,
  PenLine,
} from 'lucide-react';
import { Field, FieldError, FieldSet } from '@/components/ui/field';
import RegionFieldGroup from '@/components/RegionFieldGroup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useGetMe, useUpdateProfile } from '@/hooks/queries/useProfile';
import { toast } from 'sonner';
import { logOnDev } from '@/utils/logOnDev';
import GlobalLoader from '@/components/common/GlobalLoader';
import { useNavigate } from 'react-router';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface ProfileUpdateFormValues {
  image: File | null;
  previewImage: string;
  name: string;
  region1: string | null;
  region2: string | null;
  date: string | null;
  description: string | null;
}

export default function ProfileUpdatePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: user, isLoading } = useGetMe();
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => {
      toast.success('프로필 정보가 수정되었습니다.', { position: 'bottom-center' });
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.auth.userProfile(user.id),
        });
      }

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
      name: user?.nickname,
      previewImage: `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`,
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
    console.log(body);
    updateProfile(body);
  };

  if (isLoading || !user) return <GlobalLoader />;

  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 container mx-auto max-w-3xl duration-500'>
      <FormProvider {...profileUpdateForm}>
        <form onSubmit={profileUpdateForm.handleSubmit(onSubmit)}>
          <div className='overflow-hidden border-none'>
            {/* 1. 상단 배너 */}
            <div className='relative h-32 bg-gradient-to-r from-orange-100 to-orange-50' />
            <div className='px-8'>
              <FieldSet
                disabled={isPending}
                className='space-y-8'>
                {/* 2. 프로필 사진 및 닉네임 영역 */}
                <div className='relative -mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end'>
                  {/* 이미지 업로드 */}
                  <Controller
                    name='image'
                    control={control}
                    render={({ field: { onChange } }) => (
                      <div className='group relative'>
                        <Avatar className='border-background bg-background size-32 border-4 shadow-md'>
                          <AvatarImage
                            src={previewImage}
                            className='object-cover'
                          />
                          <AvatarFallback>profile</AvatarFallback>
                        </Avatar>

                        {/* 카메라 아이콘 버튼 (오버레이 스타일) */}
                        <Label
                          htmlFor='image'
                          className='absolute right-0 bottom-0 flex size-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-md transition-transform hover:scale-110 hover:text-orange-500'>
                          <Camera className='size-5' />
                        </Label>
                        <Input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          id='image'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            onChange(file);
                            const blobURL = URL.createObjectURL(file);
                            setValue('previewImage', blobURL);
                          }}
                        />
                      </div>
                    )}
                  />

                  {/* 닉네임 입력 */}
                  <div className='mb-2 w-full flex-1 space-y-2 sm:max-w-md'>
                    <Label
                      htmlFor='name'
                      className='text-muted-foreground ml-1 text-xs font-bold tracking-wider uppercase'>
                      Nickname
                    </Label>
                    <Field
                      data-invalid={!!errors.name}
                      className='space-y-1'>
                      <div className='relative'>
                        <Input
                          id='name'
                          readOnly
                          aria-invalid={!!errors.name}
                          type='text'
                          placeholder='닉네임을 입력하세요'
                          {...register('name', { required: '필수 항목입니다.' })}
                          className='h-12 border-gray-200 pl-10 text-xl font-bold focus-visible:ring-orange-500'
                        />
                        <User className='text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2' />
                      </div>
                      {errors.name && <FieldError errors={[errors.name]} />}
                    </Field>
                  </div>
                </div>

                {/* 3. 정보 입력 그리드 */}
                <div className='grid gap-6'>
                  <div className='grid gap-6 sm:grid-cols-2'>
                    {/* 희망 거주 지역 */}
                    <Card className='border-gray-100 bg-gray-50/50'>
                      <CardContent className='space-y-3 p-5'>
                        <div className='flex items-center gap-2 font-medium text-orange-600'>
                          <MapPin className='size-4' />
                          희망 거주 지역
                        </div>
                        <Field>
                          <RegionFieldGroup
                            region1='region1'
                            region2='region2'
                          />
                        </Field>
                      </CardContent>
                    </Card>

                    {/* 희망 입주 시기 */}
                    <Card className='border-gray-100 bg-gray-50/50'>
                      <CardContent className='space-y-3 p-5'>
                        <div className='flex items-center gap-2 font-medium text-orange-600'>
                          <CalendarIcon className='size-4' />
                          희망 입주 시기
                        </div>
                        <Controller
                          control={control}
                          name='date'
                          render={({ field: { value, onChange } }) => {
                            const stringToDate = value ? new Date(value) : undefined;
                            return (
                              <Field className='w-full'>
                                <Popover
                                  open={open}
                                  onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant='outline'
                                      id='date'
                                      className={`h-11 w-full justify-between bg-white ${!value && 'text-muted-foreground'}`}>
                                      {value || '날짜 선택'}
                                      <ChevronDownIcon className='size-4 opacity-50' />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className='w-auto p-0'
                                    align='start'>
                                    <Calendar
                                      mode='single'
                                      selected={stringToDate}
                                      captionLayout='dropdown'
                                      onSelect={(data) => {
                                        if (!data) return;
                                        const year = data.getFullYear();
                                        const month = String(data.getMonth() + 1).padStart(2, '0');
                                        const day = String(data.getDate()).padStart(2, '0');
                                        onChange(`${year}-${month}-${day}`);
                                        setOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </Field>
                            );
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* 자기소개 */}
                  <div className='space-y-3'>
                    <Label className='flex items-center gap-2 text-lg font-semibold'>
                      <PenLine className='size-4 text-orange-500' />
                      자기소개
                    </Label>
                    <Field data-invalid={!!errors.description}>
                      <Textarea
                        aria-invalid={!!errors.description}
                        className='min-h-[150px] resize-none bg-gray-50/50 text-base leading-relaxed whitespace-pre-line focus-visible:ring-orange-500'
                        placeholder='나를 표현하는 멋진 소개글을 작성해보세요!'
                        {...register('description', { required: '필수 항목입니다.' })}
                      />
                      {errors.description && <FieldError errors={[errors.description]} />}
                    </Field>
                  </div>
                </div>

                {/* 4. 하단 버튼 액션 */}
                <div className='mb-5 flex justify-end border-t pt-4'>
                  <Button
                    type='submit'
                    size='lg'
                    disabled={isPending}
                    className='bg-orange-500 text-lg font-bold text-white shadow-md transition-all hover:bg-orange-300 hover:shadow-lg'>
                    {isPending ? '저장 중...' : '수정 완료'}
                  </Button>
                </div>
              </FieldSet>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
