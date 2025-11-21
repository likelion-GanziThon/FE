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
import { Handshake, Search, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// 폼 타입
export type RoomMateFormValues = {
  type: 'TITLE' | 'CONTENT';
  searchText: string;
  region_1: string;
  region_2: string;
};

export default function RoommatePage() {
  const [filters, setFilters] = useState<Filters | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터 토글 상태

  const { data: posts, isLoading } = useGetPosts('ROOMMATE', filters);

  const communityForm = useForm<RoomMateFormValues>({
    defaultValues: {
      type: 'TITLE',
      searchText: '',
      region_1: '',
      region_2: '',
    },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = communityForm;

  // 활성 필터 확인용 (배지 표시)
  const activeRegion1 = watch('region_1');
  const activeRegion2 = watch('region_2');
  const hasActiveFilters = activeRegion1 || activeRegion2;

  const onSubmit: SubmitHandler<RoomMateFormValues> = (values) => {
    const nextFilters: Filters = {
      keyword: values.searchText,
      searchType: values.type,
      sido: values.region_1,
      sigungu: values.region_2,
    };
    setFilters(nextFilters);
    setIsFilterOpen(false); // 검색 후 필터 닫기
  };

  // 필터 초기화
  const handleClearFilters = () => {
    reset({
      type: 'TITLE',
      searchText: '',
      region_1: '',
      region_2: '',
    });
    setFilters(undefined);
  };

  return (
    <div className='animate-in fade-in min-h-screen bg-gray-50/50 pb-20 duration-500'>
      {/* 1. 상단 헤더 섹션 */}
      <div className='border-b border-gray-100 p-4'>
        <div className='mb-2 flex items-center gap-3'>
          <div className='rounded-lg bg-green-50 p-2'>
            <Handshake className='text-home-orange-600 size-6' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>룸메이트 찾기</h1>
        </div>
        <p className='pl-1 text-sm text-gray-500'>
          나와 딱 맞는 생활 패턴을 가진 룸메이트를 찾아보세요.
        </p>
      </div>

      <div className='container mx-auto mt-6 max-w-2xl px-4'>
        <FormProvider {...communityForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'>
            {/* 2. 검색 바 & 필터 버튼 */}
            <div className='flex items-start gap-2'>
              <div className='flex-1'>
                <SearchTextField />
              </div>

              {/* 필터 토글 버튼 */}
              <Button
                type='button'
                variant={hasActiveFilters ? 'default' : 'outline'}
                size='icon'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`shrink-0 transition-colors ${hasActiveFilters ? 'bg-home-orange-500 hover:bg-home-orange-600 border-transparent text-white' : 'bg-white'}`}>
                <SlidersHorizontal className='size-4' />
              </Button>

              {/* 검색 버튼 */}
              <Button
                type='submit'
                className='bg-home-orange-600 hover:bg-home-orange-300 shrink-0 text-white'>
                검색
              </Button>
            </div>

            {/* 3. 확장형 필터 영역 (지역, 타입) */}
            {isFilterOpen && (
              <div className='animate-in slide-in-from-top-2 fade-in rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
                <FieldSet
                  disabled={isSubmitting}
                  className='space-y-5'>
                  <div className='flex items-center justify-between'>
                    <span className='font-bold text-gray-700'>상세 필터</span>
                    <button
                      type='button'
                      onClick={handleClearFilters}
                      className='flex items-center gap-1 text-xs text-gray-400 underline hover:text-red-500'>
                      <X className='size-3' /> 초기화
                    </button>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                      검색 대상
                    </label>
                    <SearchTypeField />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-xs font-semibold tracking-wider text-gray-500 uppercase'>
                      지역 설정
                    </label>
                    <RegionFieldGroup
                      region1='region_1'
                      region2='region_2'
                      requiredRegion1={false}
                      requiredRegion2={false}
                    />
                  </div>
                </FieldSet>
              </div>
            )}

            {/* 활성화된 필터 뱃지 (필터창이 닫혀있을 때만 보임) */}
            {!isFilterOpen && hasActiveFilters && (
              <div className='flex gap-2 overflow-x-auto pb-2'>
                {activeRegion1 && (
                  <Badge
                    variant='secondary'
                    className='border-orange-200 bg-orange-50 text-orange-700'>
                    {activeRegion1}
                  </Badge>
                )}
                {activeRegion2 && (
                  <Badge
                    variant='secondary'
                    className='border-orange-200 bg-orange-50 text-orange-700'>
                    {activeRegion2}
                  </Badge>
                )}
              </div>
            )}
          </form>
        </FormProvider>
      </div>

      {/* 4. 게시글 리스트 */}
      <div className='container mx-auto mt-6 flex max-w-2xl flex-col gap-4 px-4'>
        {isLoading ? (
          // 로딩 스켈레톤
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='h-28 animate-pulse rounded-xl bg-white'
            />
          ))
        ) : posts?.content && posts.content.length > 0 ? (
          posts.content.map((item) => (
            <PostCard
              key={item.id}
              category={'ROOMMATE'}
              post={item}
            />
          ))
        ) : (
          // 검색 결과 없음 (Empty State)
          <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center'>
            <div className='mb-3 rounded-full bg-gray-50 p-4'>
              <Search className='size-6 text-gray-400' />
            </div>
            <p className='font-medium text-gray-900'>등록된 룸메이트 글이 없어요</p>
            <p className='mt-1 text-sm text-gray-500'>지역을 변경하거나, 직접 글을 올려보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
