import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { MapPin, RefreshCcw } from 'lucide-react'; // 아이콘 사용

// 컴포넌트 임포트 (경로는 프로젝트에 맞게 수정해주세요)
import HouseRegionFieldGroup from '@/components/HouseRegionFieldGroup';
import MessageInputBar from '@/components/MessageInputBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRecommendHouse } from '@/hooks/queries/useHouse';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

// 이전에 정의한 훅과 타입 임포트

interface HouseFormValues {
  sido: string;
  districts: string;
  prompt: string;
}

export default function HousingSearchPage() {
  // 1. React Query 훅 사용 (상태 구조분해할당)
  const {
    mutate: recommendHouse,
    isPending, // 로딩 상태
    isSuccess, // 성공 상태
    data, // 응답 데이터
    reset, // 초기화 함수 (다시 검색하기용)
  } = useRecommendHouse();

  const houseForm = useForm<HouseFormValues>({
    defaultValues: {
      sido: '',
      districts: '',
      prompt: '',
    },
  });

  const { handleSubmit } = houseForm;

  const onSubmit: SubmitHandler<HouseFormValues> = (values) => {
    recommendHouse({
      sido: values.sido,
      districts: [values.districts],
      prompt: values.prompt,
    });
  };

  // "다시 검색하기" 핸들러
  const handleReset = () => {
    reset();
    houseForm.resetField('prompt');
  };

  // 금액 포맷팅 헬퍼 함수
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  if (isPending) {
    return (
      <div className='flex min-h-[400px] flex-col items-center justify-center space-y-4'>
        <Spinner className='text-primary h-12 w-12' />

        <p className='text-muted-foreground animate-pulse text-lg'>
          조건에 맞는 최적의 집을 찾고 있습니다...
        </p>
      </div>
    );
  }

  // 2) 결과가 있을 때: 추천 목록 표시
  if (isSuccess && data) {
    return (
      <div className='p-4'>
        <div className='flex flex-col gap-10'>
          {data.recommendations.map((item) => (
            <Card
              key={item.housingInfo.id}
              className=''>
              <CardHeader className=''>
                <div className='flex items-start justify-between'>
                  <div>
                    <Badge className='mb-2'>추천 {item.rank}순위</Badge>
                    <CardTitle className='text-xl'>{item.housingInfo.hsmpNm}</CardTitle>
                    <CardDescription className='mt-1 flex items-center'>
                      <MapPin className='mr-1 h-4 w-4' />
                      {item.housingInfo.brtcNm} {item.housingInfo.signguNm}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className=''>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>보증금</span>
                    <span className='font-semibold'>
                      {formatMoney(item.housingInfo.bassRentGtn)}원
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>월 임대료</span>
                    <span className='font-semibold'>
                      {formatMoney(item.housingInfo.bassMtRntchrg)}원
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>세대수</span>
                    <span>{item.housingInfo.hshldCo}세대</span>
                  </div>
                </div>

                <div className=''>
                  <p className=''>💡 추천 이유</p>
                  {item.reason}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3) 다시 검색하기 버튼 */}
        <div className='flex justify-center pt-8 pb-20'>
          <Button
            onClick={handleReset}
            size='lg'
            className='gap-2'>
            <RefreshCcw className='h-4 w-4' />
            다시 검색하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...houseForm}>
      <div className='text-center'>
        어떤 집을 찾고 싶으세요? <br />
        원하는 지역과 조건을 입력해주세요!
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='fixed bottom-20 flex w-full max-w-175 justify-center'>
          <HouseRegionFieldGroup
            region1='sido'
            region2='districts'
          />
        </div>

        <MessageInputBar
          placeholder='예: 판교역 근처 보증금 1억 이하로 찾아줘'
          name='prompt'
        />
      </form>
    </FormProvider>
  );
}
