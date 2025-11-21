import { FieldSet } from '@/components/ui/field';

import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import SearchTypeField from '@/components/SearchTypeField';
import SearchTextField from '@/components/SearchTextField';
import { useGetPosts } from '@/hooks/queries/usePost';
import PostCard from '@/components/common/PostCard';
import type { Filters } from '@/types';
import { useState } from 'react';

// 폼 타입
export type PublicHousingFormValues = {
  type: 'TITLE' | 'CONTENT';
  searchText: string;
};

export default function PublicHousingPage() {
  const [filters, setFilters] = useState<Filters | undefined>(undefined); // 검색 필터링을 위한 상태
  // 커뮤니티 검색 폼의 상태/유효성 관리 훅 생성
  const { data: posts } = useGetPosts('POLICY', filters);
  const communityForm = useForm<PublicHousingFormValues>({
    defaultValues: {
      type: 'TITLE',
      searchText: '',
    },
    mode: 'onSubmit',
  });

  // useForm객체 메서드 구조 분해
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = communityForm;

  // 검색 폼 제출
  const onSubmit: SubmitHandler<PublicHousingFormValues> = (values) => {
    const nextFilters: Filters = {
      keyword: values.searchText,
      searchType: values.type,
    };
    setFilters(nextFilters);
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
            <Button type='submit'>검색하기</Button>
          </FieldSet>
        </form>
      </FormProvider>

      <div className='mt-10 flex flex-col gap-5'>
        {posts?.content.map((item) => (
          <PostCard
            key={item.id}
            category={'POLICY'}
            post={item}
          />
        ))}
      </div>
    </div>
  );
}
