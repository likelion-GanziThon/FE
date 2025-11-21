import { FieldSet } from '@/components/ui/field';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import SearchTypeField from '@/components/SearchTypeField';
import SearchTextField from '@/components/SearchTextField';
import { useGetPosts } from '@/hooks/queries/usePost';
import PostCard from '@/components/common/PostCard';
import type { Filters } from '@/types';
import { useState } from 'react';
import { Landmark, Search, SlidersHorizontal, X } from 'lucide-react';

// 폼 타입
export type PublicHousingFormValues = {
  type: 'TITLE' | 'CONTENT';
  searchText: string;
};

export default function PublicHousingPage() {
  const [filters, setFilters] = useState<Filters | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 필터 토글 상태

  const { data: posts, isLoading } = useGetPosts('POLICY', filters);

  const communityForm = useForm<PublicHousingFormValues>({
    defaultValues: {
      type: 'TITLE',
      searchText: '',
    },
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = communityForm;

  const onSubmit: SubmitHandler<PublicHousingFormValues> = (values) => {
    const nextFilters: Filters = {
      keyword: values.searchText,
      searchType: values.type,
    };
    setFilters(nextFilters);
    setIsFilterOpen(false); // 검색 후 필터 닫기
  };

  // 필터 초기화
  const handleClearFilters = () => {
    reset({
      type: 'TITLE',
      searchText: '',
    });
    setFilters(undefined);
  };

  return (
    <div className='animate-in fade-in min-h-screen bg-gray-50/50 pb-20 duration-500'>
      {/* 1. 상단 헤더 섹션 */}
      <div className='border-b border-gray-100 p-4'>
        <div className='mb-2 flex items-center gap-3'>
          <div className='rounded-lg bg-blue-50 p-2'>
            {/* 정책 관련이므로 신뢰감을 주는 파란색 계열 혹은 기존 테마 유지 */}
            <Landmark className='text-home-orange-600 size-6' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>정부 주거 지원</h1>
        </div>
        <p className='pl-1 text-sm text-gray-500'>복잡한 청약, 임대주택 공고를 쉽게 확인하세요.</p>
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
                variant={isFilterOpen ? 'default' : 'outline'}
                size='icon'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`shrink-0 transition-colors ${isFilterOpen ? 'bg-home-orange-300 hover:bg-home-orange-600 border-transparent text-white' : 'bg-white'}`}>
                <SlidersHorizontal className='size-4' />
              </Button>

              {/* 검색 버튼 */}
              <Button
                type='submit'
                className='bg-home-orange-600 hover:bg-home-orange-300 shrink-0 text-white'>
                검색
              </Button>
            </div>

            {/* 3. 확장형 필터 영역 (검색 타입) */}
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
                </FieldSet>
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
              category={'POLICY'}
              post={item}
            />
          ))
        ) : (
          // 검색 결과 없음 (Empty State)
          <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center'>
            <div className='mb-3 rounded-full bg-gray-50 p-4'>
              <Search className='size-6 text-gray-400' />
            </div>
            <p className='font-medium text-gray-900'>등록된 정보가 없어요</p>
            <p className='mt-1 text-sm text-gray-500'>다른 키워드로 검색해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
