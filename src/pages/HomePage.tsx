import PostCard from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowUpRight,
  Landmark,
  Users,
  Handshake,
  Sparkles, // AI 아이콘 추가
  Search, // 검색 아이콘 추가
} from 'lucide-react';
import { useGetMainPosts } from '@/hooks/queries/usePost';
import { useGetMe } from '@/hooks/queries/useProfile';

import { useNavigate } from 'react-router';

export default function HomePage() {
  const { data: mainPosts } = useGetMainPosts();
  const { data: me } = useGetMe();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-8 p-6 pb-24'>
      {/* 1. 상단 인사말 */}
      <div className='flex flex-col gap-2'>
        <p className='text-home-gray-700 text-lg'>{me?.nickname}님, 새로운 시작을 응원해요.</p>
        <p className='text-2xl font-bold'>
          필요한 모든 정보는 <span className='text-home-orange-600'>홈메이트</span>가 챙겨드릴게요.
        </p>
      </div>

      {/* 2. 메인 기능 카드 리스트 */}
      <div className='flex flex-col gap-8'>
        {/* [NEW] AI 집 추천 카드 (가장 상단 배치 & 강조 스타일) */}
        <Card className='group relative overflow-hidden border-orange-100 bg-orange-50/30 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
          {/* 호버 시 나타나는 오버레이 효과 (기존 통일) */}
          <div className='bg-background/80 pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-has-[.hover-trigger:hover]:opacity-100'>
            <span className='text-foreground animate-in zoom-in-50 text-lg font-bold duration-900'>
              AI가 딱 맞는 집을 찾아드려요!
            </span>
          </div>

          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-orange-700'>
              <Sparkles className='size-5 fill-orange-500 text-orange-600' />
              AI 맞춤 집 추천
            </CardTitle>
            <CardDescription className='text-orange-900/70'>
              원하는 지역과 조건을 말만 하세요. 공공 데이터를 분석해 프롬프트에 딱 맞는 집을 추천해
              드립니다.
            </CardDescription>
            <CardAction>
              <Button
                onClick={() => navigate('/housing-search')}
                variant={'ghost'}
                size={'icon-sm'}
                asChild
                className='hover-trigger relative z-20 hover:bg-orange-100'>
                <ArrowUpRight className='text-orange-600' />
              </Button>
            </CardAction>
          </CardHeader>

          {/* 컨텐츠: 게시글 목록 대신 '프롬프트 검색창 예시'를 보여줌 */}
          <CardContent>
            <div className='flex items-center gap-3 rounded-xl border border-white/60 bg-white/60 px-4 py-4 shadow-sm backdrop-blur-sm'>
              <Search className='size-4 text-gray-400' />
              <span className='text-sm font-medium text-gray-400'>
                "강남역 근처, 보증금 1000만원 이하 치안 좋은 원룸 찾아줘"
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 3. 게시판 카드 리스트 (기존 유지) */}
        <div className='flex flex-col gap-10'>
          <Card className='group relative overflow-hidden transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
            <div className='bg-background/80 pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-has-[.hover-trigger:hover]:opacity-100'>
              <span className='text-foreground animate-in zoom-in-50 text-lg font-bold duration-900'>
                {me?.nickname}님, 환영해요!
              </span>
            </div>
            <CardHeader className=''>
              <CardTitle className='flex items-center gap-1'>
                <Users />
                커뮤니티 게시판
              </CardTitle>
              <CardDescription>
                공공 데이터로 안 보이는 생활 정보와 솔직한 후기를 자유롭게 나눠요.
              </CardDescription>
              <CardAction>
                <Button
                  onClick={() => navigate('/community')}
                  variant={'ghost'}
                  size={'icon-sm'}
                  asChild
                  className='hover-trigger relative z-20'>
                  <ArrowUpRight />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              {mainPosts?.free.map((freePost) => (
                <PostCard
                  key={freePost.id}
                  category='FREE'
                  post={freePost}
                />
              ))}
            </CardContent>
          </Card>

          <Card className='group relative overflow-hidden transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
            <div className='bg-background/80 pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-has-[.hover-trigger:hover]:opacity-100'>
              <span className='text-foreground animate-in zoom-in-50 text-lg font-bold duration-900'>
                {me?.nickname}님, 환영해요!
              </span>
            </div>
            <CardHeader className=''>
              <CardTitle className='flex items-center gap-1'>
                <Handshake />
                룸메이트 게시판
              </CardTitle>
              <CardDescription>
                비슷한 생활 패턴·가치관의 룸메이트를 찾고 싶다면, 여기서 먼저 알아보세요.
              </CardDescription>
              <CardAction>
                <Button
                  onClick={() => navigate('/roommate')}
                  variant={'ghost'}
                  size={'icon-sm'}
                  asChild
                  className='hover-trigger relative z-20'>
                  <ArrowUpRight />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              {mainPosts?.roommate.map((roomatePost) => (
                <PostCard
                  key={roomatePost.id}
                  category='ROOMMATE'
                  post={roomatePost}
                />
              ))}
            </CardContent>
          </Card>

          <Card className='group relative overflow-hidden transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
            <div className='bg-background/80 pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 backdrop-blur-sm transition-all duration-300 group-has-[.hover-trigger:hover]:opacity-100'>
              <span className='text-foreground animate-in zoom-in-50 text-lg font-bold duration-900'>
                {me?.nickname}님, 환영해요!
              </span>
            </div>
            <CardHeader className=''>
              <CardTitle className='flex items-center gap-1'>
                <Landmark />
                정부 주거 관련 게시판
              </CardTitle>
              <CardDescription>
                복잡한 주거 지원 제도, 실제 신청해본 사람들의 경험과 함께 정리해 드립니다.
              </CardDescription>
              <CardAction>
                <Button
                  onClick={() => navigate('/public-housing')}
                  variant={'ghost'}
                  size={'icon-sm'}
                  asChild
                  className='hover-trigger relative z-20'>
                  <ArrowUpRight />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              {mainPosts?.policy.map((policyPost) => (
                <PostCard
                  key={policyPost.id}
                  category='POLICY'
                  post={policyPost}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
