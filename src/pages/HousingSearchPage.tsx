import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { MapPin, RefreshCcw, Sparkles, Home, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// 컴포넌트 임포트
import HouseRegionFieldGroup from '@/components/HouseRegionFieldGroup';
import MessageInputBar from '@/components/MessageInputBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRecommendHouse } from '@/hooks/queries/useHouse';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface HouseFormValues {
  sido: string;
  districts: string;
  prompt: string;
}

// --- [Sub Component] 화려한 로딩 화면 ---
const SearchLoading = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    '입력하신 지역을 분석하고 있어요...',
    '주변 시세와 교통편을 확인 중이에요...',
    '예산에 딱 맞는 집을 선별하고 있어요...',
    'AI가 추천 사유를 작성하고 있어요...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // 2초마다 메시지 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='animate-in fade-in flex h-[60vh] flex-col items-center justify-center space-y-8 px-6 text-center duration-700'>
      {/* 아이콘 애니메이션 */}
      <div className='relative'>
        <div className='bg-home-orange-100 absolute -inset-4 animate-ping rounded-full opacity-20' />
        <div className='bg-home-orange-50 flex size-24 animate-bounce items-center justify-center rounded-full shadow-lg'>
          <Home className='text-home-orange-500 size-10' />
        </div>
        <Sparkles className='absolute -top-2 -right-2 size-8 animate-spin text-yellow-400 duration-[3000ms]' />
      </div>

      {/* 텍스트 애니메이션 */}
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold text-gray-800'>최적의 집을 찾고 있어요</h3>
        <div className='h-8 overflow-hidden'>
          <p
            key={messageIndex}
            className='text-muted-foreground animate-in slide-in-from-bottom-2 fade-in text-lg font-medium duration-500'>
            {messages[messageIndex]}
          </p>
        </div>
      </div>

      {/* 진행바 (장식용) */}
      <div className='h-1.5 w-48 overflow-hidden rounded-full bg-gray-100'>
        <div className='bg-home-orange-400 h-full w-full origin-left animate-[scale-x_8s_linear_infinite]' />
      </div>
    </div>
  );
};

export default function HousingSearchPage() {
  const { mutate: recommendHouse, isPending, isSuccess, data, reset } = useRecommendHouse();

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

  const handleReset = () => {
    reset();
    houseForm.resetField('prompt');
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  // 랭킹 뱃지 스타일 헬퍼
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white border-yellow-500 shadow-md'; // 금메달 느낌
      case 2:
        return 'bg-gray-400 text-white border-gray-400'; // 은메달 느낌
      case 3:
        return 'bg-orange-700 text-white border-orange-700'; // 동메달 느낌
      default:
        return 'bg-white text-gray-500 border-gray-200';
    }
  };

  // 1. 로딩 상태
  if (isPending) {
    return <SearchLoading />;
  }

  // 2. 결과 상태
  if (isSuccess && data) {
    return (
      <div className='animate-in fade-in slide-in-from-bottom-8 pb-24 duration-500'>
        <div className='bg-home-orange-50 px-6 pt-6 pb-8'>
          <h2 className='text-2xl leading-tight font-bold text-gray-900'>
            발견했습니다! <br />
            <span className='text-home-orange-600'>
              AI가 추천하는 TOP {data.recommendations.length}
            </span>
          </h2>
        </div>

        <div className='-mt-6 flex flex-col gap-6 px-4'>
          {data.recommendations.map((item) => (
            <Card
              key={item.housingInfo.id}
              className='overflow-hidden border-none shadow-lg transition-all hover:shadow-xl'>
              {/* 카드 헤더: 순위 및 기본 정보 */}
              <div className='bg-white p-5 pb-0'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-1'>
                    <Badge
                      variant='outline'
                      className={`mb-2 px-3 py-1 text-sm font-bold ${getRankStyle(item.rank)}`}>
                      {item.rank}순위 추천
                    </Badge>
                    <h3 className='text-xl font-bold text-gray-900'>{item.housingInfo.hsmpNm}</h3>
                    <div className='text-muted-foreground flex items-center text-sm font-medium'>
                      <MapPin className='mr-1 size-3.5' />
                      {item.housingInfo.brtcNm} {item.housingInfo.signguNm}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className='p-5 pt-4'>
                {/* 핵심 가격 정보 */}
                <div className='mb-5 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4'>
                  <div>
                    <span className='text-muted-foreground block text-xs'>보증금</span>
                    <span className='text-lg font-bold text-gray-900'>
                      {formatMoney(item.housingInfo.bassRentGtn)}원
                    </span>
                  </div>
                  <div>
                    <span className='text-muted-foreground block text-xs'>월 임대료</span>
                    <span className='text-lg font-bold text-gray-900'>
                      {formatMoney(item.housingInfo.bassMtRntchrg)}원
                    </span>
                  </div>
                </div>

                <div className='mb-4 flex justify-between text-sm'>
                  <span className='text-muted-foreground'>총 세대수</span>
                  <span className='font-medium'>{item.housingInfo.hshldCo}세대</span>
                </div>

                <Separator className='my-4' />

                {/* AI 추천 사유 (말풍선 스타일) */}
                <div className='bg-home-orange-50/50 relative rounded-2xl rounded-tl-none p-4'>
                  <div className='text-home-orange-600 mb-2 flex items-center gap-2 text-sm font-bold'>
                    <Sparkles className='size-4 fill-current' />
                    AI 추천 이유
                  </div>
                  <p className='text-sm leading-relaxed text-gray-700'>{item.reason}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 하단 고정 버튼 (다시 검색) */}
        <div className='fixed right-0 bottom-6 left-0 flex justify-center px-4'>
          <Button
            onClick={handleReset}
            size='lg'
            className='w-full max-w-md rounded-full bg-gray-900 py-6 text-lg font-bold text-white shadow-xl hover:bg-gray-800'>
            <RefreshCcw className='mr-2 size-5' />
            조건 바꿔서 다시 찾기
          </Button>
        </div>
      </div>
    );
  }

  // 3. 초기 입력 상태
  return (
    <FormProvider {...houseForm}>
      <div className='flex h-full flex-col'>
        {/* 상단 안내 문구 (중앙 배치) */}
        <div className='flex flex-1 flex-col items-center justify-center py-25 text-center'>
          <div className='bg-home-orange-100 animate-in zoom-in mb-6 rounded-full p-4 duration-500'>
            <TrendingUp className='text-home-orange-600 size-8' />
          </div>
          <h1 className='text-2xl leading-normal font-bold text-gray-900 sm:text-3xl'>
            어떤 집을 찾고 계신가요?
          </h1>
          <p className='text-muted-foreground mt-3 text-lg'>
            원하는 지역과 조건을 말해주시면 <br />
            <span className='text-home-orange-500 font-bold'>AI가 딱 맞는 공공임대</span>를
            찾아드려요.
          </p>
        </div>

        {/* 하단 입력 영역 (지역 선택 + 채팅바) */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 지역 선택 버튼들을 하단 채팅바 바로 위에 띄움 */}
          <div className='mx-auto flex justify-center'>
            <HouseRegionFieldGroup
              region1='sido'
              region2='districts'
            />
          </div>

          <div className=''>
            <MessageInputBar
              placeholder='예: 멋사대학 근처 월세 100만원 이하...'
              name='prompt'
            />
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
