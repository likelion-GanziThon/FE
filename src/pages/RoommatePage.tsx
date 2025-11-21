import { FieldSet } from '@/components/ui/field';

import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import SearchTypeField from '@/components/SearchTypeField';
import SearchTextField from '@/components/SearchTextField';
import RegionFieldGroup from '@/components/RegionFieldGroup';
import { useGetPosts } from '@/hooks/queries/usePost';
import PostCard from '@/components/common/PostCard';
import type { Filters } from '@/types';
import { useState } from 'react';

// 폼 타입
export type RoomMateFormValues = {
  type: 'TITLE' | 'CONTENT';
  searchText: string;
  region_1: string;
  region_2: string;
};

export default function RoommatePage() {
  const [filters, setFilters] = useState<Filters | undefined>(undefined); // 검색 필터링을 위한 상태
  // 커뮤니티 검색 폼의 상태/유효성 관리 훅 생성
  const { data: posts } = useGetPosts('ROOMMATE', filters);
  const communityForm = useForm<RoomMateFormValues>({
    defaultValues: {
      type: 'TITLE',
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
  const onSubmit: SubmitHandler<RoomMateFormValues> = (values) => {
    const nextFilters: Filters = {
      keyword: values.searchText,
      searchType: values.type,
      sido: values.region_1,
      sigungu: values.region_2,
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
            <RegionFieldGroup
              region1='region_1'
              region2='region_2'
              requiredRegion1={false}
              requiredRegion2={false}
            />
            <Button type='submit'>검색하기</Button>
          </FieldSet>
        </form>
      </FormProvider>

      <div className='mt-10 flex flex-col gap-5'>
        {posts?.content.map((item) => (
          <PostCard
            key={item.id}
            category={'ROOMMATE'}
            post={item}
          />
        ))}
      </div>
    </div>
  );
}
