import RegionFieldGroup from '@/components/RegionFieldGroup';
import { Field, FieldError, FieldLegend, FieldSet } from '@/components/ui/field';
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

import ImagePreviewList from '@/components/ImagePreviewList';
import { useCreatePost } from '@/hooks/queries/usePost';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { logOnDev } from '@/utils/logOnDev';

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
      toast.success('성공적으로 게시글을 업로드했습니다..', { position: 'top-center' });
      navigate(`/`);
    },
    onError: (error) => {
      logOnDev(error.message);
      toast.error('게시글 업로드 중 문제가 발생했습니다.', { position: 'top-center' });
    },
  });

  const postForm = useForm<postFormValues>({
    shouldUnregister: true, // 언마운트 시 삭제
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

  // 카테고리 추적
  const currentCategory = useWatch({ control, name: 'category' });

  const onSubmit: SubmitHandler<postFormValues> = (values) => {
    createPost(values);
  };
  return (
    <FormProvider {...postForm}>
      <form
        className='p-4'
        onSubmit={handleSubmit(onSubmit)}>
        <FieldSet disabled={isPending}>
          <FieldLegend>글쓰기</FieldLegend>

          <Controller
            control={control}
            name='category'
            render={({ field: { value, onChange } }) => (
              <Field>
                <Select
                  value={value}
                  onValueChange={(data) => onChange(data)}>
                  <SelectTrigger>
                    <SelectValue placeholder='카테고리 선택' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='FREE'>커뮤니티</SelectItem>
                    <SelectItem value='POLICY'>정부 주거 관련 정보</SelectItem>
                    <SelectItem value='ROOMMATE'>룸메이트</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          {currentCategory !== 'POLICY' && (
            <RegionFieldGroup
              region1='sidoCode'
              region2='sigunguCode'
            />
          )}

          <Field data-invalid={!!errors.title}>
            <Input
              aria-invalid={!!errors.title}
              type='text'
              placeholder='제목을 입력해주세요.'
              {...register('title', { required: '필수 항목입니다.' })}
            />
            {!!errors.title && <FieldError errors={[errors.title]} />}
          </Field>

          <Field data-invalid={!!errors.content}>
            <Textarea
              className='h-40'
              aria-invalid={!!errors.content}
              placeholder='내용을 입력해주세요.'
              {...register('content', { required: '필수 항목입니다.' })}
            />
            {!!errors.content && <FieldError errors={[errors.content]} />}
          </Field>

          {currentCategory === 'ROOMMATE' && (
            <Field data-invalid={!!errors.openchatUrl}>
              <Input
                aria-invalid={!!errors.openchatUrl}
                type='text'
                placeholder='오픈채팅방 링크를 넣어주세요..'
                {...register('openchatUrl', { required: '필수 항목입니다.' })}
              />
              {!!errors.openchatUrl && <FieldError errors={[errors.openchatUrl]} />}
            </Field>
          )}

          <ImagePreviewList />

          <Button type='submit'>완료</Button>
        </FieldSet>
      </form>
    </FormProvider>
  );
}
