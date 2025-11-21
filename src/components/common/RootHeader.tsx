import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Link } from 'react-router'; // useNavigate 추가
import { Button } from '../ui/button';
import { Separator } from '@/components/ui/separator'; // 구분선 추가
import hamburger from '@/assets/hamburger.png';
import hmoe1 from '@/assets/main1.png';
import hmoe2 from '@/assets/main2.png';
import hmoe3 from '@/assets/main3.png';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetMe } from '@/hooks/queries/useProfile';
import GlobalLoader from '@/components/common/GlobalLoader';

// 아이콘 임포트 (lucide-react)
import {
  Home,
  Users,
  Search,
  Handshake,
  Landmark,
  PenLine,
  LogOut,
  ChevronRight,
} from 'lucide-react';

// 메뉴에 아이콘 정보 추가
const nav = [
  {
    label: '메인',
    path: '/',
    icon: Home,
  },
  {
    label: '주거 정보 찾기',
    path: '/housing-search',
    icon: Search,
  },
  {
    label: '커뮤니티',
    path: '/community',
    icon: Users,
  },
  {
    label: '룸메이트',
    path: '/roommate',
    icon: Handshake,
  },
  {
    label: '정부 주거관련 정보',
    path: '/public-housing',
    icon: Landmark,
  },
];

export default function RootHeader() {
  const { data: user, isPending } = useGetMe();

  if (isPending) return <GlobalLoader />;

  return (
    <>
      <header className='bg-home-brown-400 flex flex-col'>
        <Sheet>
          <SheetTrigger className='self-end p-5 transition-opacity hover:opacity-80'>
            <img
              src={hamburger}
              alt='메뉴 열기'
              className='size-6'
            />
          </SheetTrigger>
          <SheetContent className='border-l-home-brown-200 bg-background flex h-full w-1/2 flex-col p-0 sm:w-[380px]'>
            <SheetHeader className='bg-home-orange-100/30 p-6 pb-4 text-left'>
              <SheetTitle className='sr-only'>메뉴</SheetTitle>
              <SheetDescription className='sr-only'>메뉴 목록입니다.</SheetDescription>

              <div className='flex items-center gap-4 pt-4'>
                <SheetClose asChild>
                  <Link
                    to={`/profile/${user?.id}`}
                    className='group relative'>
                    <Avatar className='border-home-orange-300 size-15 border-2 transition-transform duration-500 group-hover:scale-105'>
                      <AvatarImage
                        src={
                          user?.profileImageUrl?.startsWith('http')
                            ? user.profileImageUrl
                            : `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`
                        }
                        className=''
                      />
                      <AvatarFallback>MY</AvatarFallback>
                    </Avatar>
                  </Link>
                </SheetClose>
                <div className='flex flex-col overflow-hidden'>
                  <span className='text-muted-foreground text-xs font-medium'>반가워요!</span>
                  <SheetClose asChild>
                    <Link
                      to={`/profile/${user?.id}`}
                      className='group flex items-center gap-1'>
                      <span className='truncate text-lg leading-tight font-bold'>
                        {user?.nickname}님
                      </span>
                      <ChevronRight className='text-muted-foreground size-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100' />
                    </Link>
                  </SheetClose>
                </div>
              </div>

              {/* 글쓰기 버튼: 프로필 하단에 강조된 형태로 배치 */}
              <div className='mt-6'>
                <SheetClose asChild>
                  <Button
                    asChild
                    className='bg-home-orange-600 hover:bg-home-orange-300 w-full justify-center gap-2 text-white shadow-sm transition-all hover:shadow-md'>
                    <Link to={'/post-create'}>
                      <PenLine className='size-4' />새 글 작성하기
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>

            <Separator className='bg-border/50' />

            <nav className='flex-1 overflow-y-auto px-3 py-4'>
              <ul className='flex flex-col gap-1'>
                {nav.map((item) => (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        to={item.path}
                        className='group hover:bg-home-orange-100/50 hover:text-home-orange-900 flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 ease-in-out'>
                        <item.icon className='text-muted-foreground group-hover:text-home-orange-600 size-5 transition-colors' />
                        {item.label}
                        <ChevronRight className='ml-auto size-4 text-transparent transition-all group-hover:translate-x-1 group-hover:text-black/20' />
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 하단 푸터: 로그아웃 */}
            <SheetFooter className='border-t bg-gray-50/50 p-4 sm:justify-start'>
              <Button
                variant='ghost'
                className='text-muted-foreground w-full justify-start gap-2 pl-2 hover:bg-red-50 hover:text-red-600'
                onClick={() => {
                  localStorage.clear();
                }}>
                <LogOut className='size-4' />
                로그아웃
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* 헤더 이미지 영역 (기존 유지) */}
        <div className='flex justify-center gap-10 pb-4'>
          <img
            src={hmoe1}
            alt='장식 이미지 1'
            className='size-8 object-contain'
          />
          <img
            src={hmoe2}
            alt='장식 이미지 2'
            className='size-8 object-contain'
          />
          <img
            src={hmoe3}
            alt='장식 이미지 3'
            className='size-8 object-contain'
          />
        </div>
      </header>
    </>
  );
}
