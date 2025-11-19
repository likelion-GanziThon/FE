import { FieldSet } from '@/components/ui/field';

import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import SearchTypeField from '@/components/SearchTypeField';
import SearchTextField from '@/components/SearchTextField';
import RegionFieldGroup from '@/components/RegionFieldGroup';

// 폼 타입
export type CommunityFormValues = {
  type: 'title' | 'content';
  searchText: string;
  region_1: string;
  region_2: string;
};

export default function CommunityPage() {
  // 커뮤니티 검색 폼의 상태/유효성 관리 훅 생성
  const communityForm = useForm<CommunityFormValues>({
    defaultValues: {
      type: 'title',
      searchText: '',
      region_1: '',
      region_2: '',
    },
    mode: 'onSubmit',
  });

  // useForm객체 메서드 구조 분해
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = communityForm;

  // 검색 폼 제출
  const onSubmit: SubmitHandler<CommunityFormValues> = (values) => {
    console.log(values);
  };

  return (
    <div className='px-10'>
      <FormProvider {...communityForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet disabled={isSubmitting}>
            <div className='flex gap-4'>
              <SearchTypeField />
              <SearchTextField />
            </div>
            <RegionFieldGroup
              region1='region_1'
              region2='region_2'
            />
            <Button type='submit'>검색하기</Button>
          </FieldSet>
        </form>
      </FormProvider>
    </div>
  );
}
