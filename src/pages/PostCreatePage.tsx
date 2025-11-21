import RegionFieldGroup from '@/components/RegionFieldGroup';
import { Field, FieldError, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { PostCategory } from '@/types';
import { Controller, FormProvider, useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ImagePreviewList from '@/components/ImagePreviewList';
import { useCreatePost } from '@/hooks/queries/usePost';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { logOnDev } from '@/utils/logOnDev';
import {
  ChevronLeft,
  MessageCircle,
  Layers,
  MapPin,
  PenSquare,
  Sparkles,
  ImagePlus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface postFormValues {
  category: PostCategory;
  title: string;
  content: string;
  sidoCode: string;
  sigunguCode: string;
  openchatUrl?: string;
  images?: File[] | null;
}

export default function PostCreatePage() {
  const navigate = useNavigate();

  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess: () => {
      toast.success('성공적으로 게시글을 업로드했습니다.', { position: 'top-center' });
      navigate(`/`);
    },
    onError: (error) => {
      logOnDev(error.message);
      toast.error('게시글 업로드 중 문제가 발생했습니다.', { position: 'top-center' });
    },
  });

  const postForm = useForm<postFormValues>({
    shouldUnregister: true,
    defaultValues: {
      category: 'FREE',
      title: '',
      content: '',
      sidoCode: '',
      sigunguCode: '',
      openchatUrl: '',
      images: null,
    },
  });
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = postForm;

  const currentCategory = useWatch({ control, name: 'category' });

  const onSubmit: SubmitHandler<postFormValues> = (values) => {
    createPost(values);
  };

  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 min-h-screen bg-white pb-28 duration-500'>
      <header className='sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-white/90 px-4 backdrop-blur-md'>
        <button
          onClick={() => navigate(-1)}
          className='rounded-full p-2 transition-colors hover:bg-gray-100'>
          <ChevronLeft className='size-6 text-gray-700' />
        </button>
        <h1 className='text-base font-semibold text-gray-900'>글쓰기</h1>
        <div className='w-10' />
      </header>

      <div className='container mx-auto max-w-2xl pt-6'>
        <FormProvider {...postForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='px-5'>
            <FieldSet
              disabled={isPending}
              className='space-y-8'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Card className='border-orange-100 bg-orange-50/30 shadow-sm'>
                  <CardContent className='flex flex-col gap-2 p-4'>
                    <div className='flex items-center gap-2'>
                      <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm'>
                        <Layers className='size-4' />
                      </div>
                      <Label className='text-xs font-medium text-gray-500'>게시판 선택</Label>
                    </div>
                    <Controller
                      control={control}
                      name='category'
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          onValueChange={onChange}>
                          <SelectTrigger className='h-10 border-none bg-transparent px-0 text-base font-semibold shadow-none focus:ring-0'>
                            <SelectValue placeholder='게시판 선택' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='FREE'>🗣️ 자유 커뮤니티</SelectItem>
                            <SelectItem value='POLICY'>🏛️ 정부 주거 정보</SelectItem>
                            <SelectItem value='ROOMMATE'>🤝 룸메이트 구해요</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </CardContent>
                </Card>

                {currentCategory !== 'POLICY' && (
                  <Card className='animate-in fade-in zoom-in-95 border-orange-100 bg-orange-50/30 shadow-sm duration-300'>
                    <CardContent className='flex flex-col gap-2 p-4'>
                      <div className='flex items-center gap-2'>
                        <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm'>
                          <MapPin className='size-4' />
                        </div>
                        <Label className='text-xs font-medium text-gray-500'>지역 설정</Label>
                      </div>
                      <div className='-ml-1'>
                        {/* RegionFieldGroup 내부 스타일이 SelectTrigger와 비슷하다면 여기서 패딩 조절 필요 */}
                        <RegionFieldGroup
                          region1='sidoCode'
                          region2='sigunguCode'
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className='space-y-2'>
                <Field data-invalid={!!errors.title}>
                  <Input
                    aria-invalid={!!errors.title}
                    type='text'
                    placeholder='제목을 입력하세요'
                    {...register('title', { required: '제목은 필수입니다.' })}
                    className='h-auto border-none px-0 py-2 text-2xl font-bold placeholder:text-gray-300 focus-visible:ring-0'
                  />
                  {!!errors.title && <FieldError errors={[errors.title]} />}
                </Field>
                <Separator className='bg-gray-100' />
              </div>

              <div className='relative min-h-[300px]'>
                <Field
                  data-invalid={!!errors.content}
                  className='h-full'>
                  <Textarea
                    className='min-h-[300px] resize-none border-none p-0 text-base leading-relaxed placeholder:text-gray-300 focus-visible:ring-0'
                    aria-invalid={!!errors.content}
                    placeholder='자유롭게 내용을 작성해주세요.&#13;&#10;부적절한 내용은 제재 받을 수 있습니다.'
                    {...register('content', { required: '내용을 입력해주세요.' })}
                  />
                  {!!errors.content && <FieldError errors={[errors.content]} />}
                </Field>
              </div>

              {currentCategory === 'ROOMMATE' && (
                <div className='animate-in slide-in-from-bottom-2 fade-in rounded-xl border border-blue-100 bg-blue-50/30 p-4'>
                  <div className='mb-2 flex items-center gap-2'>
                    <MessageCircle className='size-4 text-blue-500' />
                    <span className='text-sm font-semibold text-blue-700'>오픈채팅방 연결</span>
                  </div>
                  <Field data-invalid={!!errors.openchatUrl}>
                    <Input
                      aria-invalid={!!errors.openchatUrl}
                      type='text'
                      placeholder='https://open.kakao.com/...'
                      {...register('openchatUrl', {
                        required: '원활한 소통을 위해 링크가 필요해요.',
                      })}
                      className='border-blue-200 bg-white focus-visible:ring-blue-400'
                    />
                    {!!errors.openchatUrl && <FieldError errors={[errors.openchatUrl]} />}
                  </Field>
                  <p className='mt-2 text-xs text-blue-600/70'>
                    * 룸메이트 매칭을 위해 연락 가능한 링크를 남겨주세요.
                  </p>
                </div>
              )}

              <div className='space-y-4'>
                {/* 헤더 및 안내 문구 */}
                <div className='flex items-end justify-between'>
                  <div className='flex items-center gap-2 text-gray-900'>
                    <ImagePlus className='size-5 text-orange-500' />
                    <span className='font-semibold'>사진 첨부</span>
                  </div>
                  <span className='text-xs font-medium text-gray-400'>(선택 사항)</span>
                </div>

                <div className='group relative min-h-[120px] rounded-xl border-2 border-dashed border-orange-200/50 bg-orange-50/20 p-4 transition-all duration-300 hover:border-orange-400/70 hover:bg-orange-50/70 hover:shadow-sm'>
                  <div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-10'>
                    <ImagePlus className='size-20 text-orange-300' />
                  </div>

                  <div className='relative z-10'>
                    <ImagePreviewList />
                  </div>
                </div>
              </div>
            </FieldSet>

            <div className='safe-area-bottom fixed right-0 bottom-0 left-0 z-20 border-t border-gray-100 bg-white p-4 sm:static sm:border-none sm:bg-transparent sm:p-0 sm:pt-8'>
              <Button
                type='submit'
                size='lg'
                className='w-full rounded-xl bg-gray-900 py-6 text-lg font-bold shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-[0.98]'
                disabled={isPending}>
                {isPending ? (
                  <span className='flex items-center gap-2'>
                    <Sparkles className='size-5 animate-spin' /> 업로드 중...
                  </span>
                ) : (
                  <span className='flex items-center gap-2'>
                    <PenSquare className='size-5' /> 작성 완료
                  </span>
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
