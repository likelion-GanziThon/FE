import GlobalLoader from '@/components/common/GlobalLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useGetMe, useGetOtherProfile } from '@/hooks/queries/useProfile';
import { MapPin, Calendar, User, PenSquare } from 'lucide-react';

import { Link, useParams } from 'react-router';

export default function ProfilePage() {
  const { userId } = useParams();

  const { data: user, isLoading: userLoading } = useGetOtherProfile(Number(userId));
  const { data: me, isLoading: myLoading } = useGetMe();

  if (myLoading || !me || !user || userLoading) return <GlobalLoader />;

  const isMyProfile = me?.id === user?.id;

  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 container mx-auto max-w-3xl duration-500'>
      <div className='overflow-hidden border-none'>
        {/* 1. 상단 배너 (커버 이미지 느낌) */}
        <div className='relative h-32 bg-gradient-to-r from-orange-100 to-orange-50'>
          {isMyProfile && (
            <div className='absolute top-4 right-4'>
              <Button
                variant='secondary'
                size='sm'
                className='bg-white/50 text-orange-800 backdrop-blur-sm hover:bg-white/80'
                asChild>
                <Link to={`/profile/${user?.id}/update`}>
                  <PenSquare className='mr-1.5 size-4' />
                  프로필 수정
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className='px-8 pb-8'>
          {/* 2. 프로필 헤더 (아바타 + 닉네임) */}
          <div className='relative -mt-12 mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div className='flex items-end gap-5'>
              <Avatar className='border-background bg-background size-32 border-4 shadow-md'>
                <AvatarImage
                  src={
                    user?.profileImageUrl?.startsWith('http')
                      ? user.profileImageUrl
                      : `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`
                  }
                  className='object-cover'
                />
                <AvatarFallback className='bg-orange-50 text-2xl text-orange-500'>
                  {user.nickname.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className='mb-2 space-y-1'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                  {user?.nickname}
                </h1>
                <Badge
                  variant='secondary'
                  className='text-muted-foreground bg-gray-100 hover:bg-gray-100'>
                  @{user?.nickname} 님
                </Badge>
              </div>
            </div>
          </div>

          {/* 3. 주요 정보 그리드 (지역, 날짜) */}
          <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Card className='border-orange-100 bg-orange-50/30 shadow-sm'>
              <CardContent className='flex items-center gap-4 p-4'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm'>
                  <MapPin className='size-5' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-xs font-medium'>희망 거주 지역</span>
                  <span
                    className={`font-semibold ${!user?.desiredArea && 'text-muted-foreground text-sm font-normal'}`}>
                    {user?.desiredArea || '아직 지역을 정하지 않았어요'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='border-orange-100 bg-orange-50/30 shadow-sm'>
              <CardContent className='flex items-center gap-4 p-4'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm'>
                  <Calendar className='size-5' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-xs font-medium'>희망 입주 시기</span>
                  <span
                    className={`font-semibold ${!user?.desiredMoveInDate && 'text-muted-foreground text-sm font-normal'}`}>
                    {user?.desiredMoveInDate || '입주 시기를 고민 중이에요'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className='my-8 bg-gray-100' />

          {/* 4. 자기소개 섹션 */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
              <User className='size-5 text-orange-500' />
              <h3>자기소개</h3>
            </div>

            <div className='relative min-h-[120px] rounded-xl border bg-gray-50 p-6 text-gray-700'>
              <div className='relative z-10 leading-relaxed whitespace-pre-line'>
                {user?.introduction ? (
                  user.introduction
                ) : (
                  <span className='text-muted-foreground flex h-20 items-center justify-center italic'>
                    작성된 자기소개가 없습니다.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
