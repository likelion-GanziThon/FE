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
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetMe } from '@/hooks/queries/useProfile';
import GlobalLoader from '@/components/common/GlobalLoader';

const nav = [
  {
    label: '메인',
    path: '/',
  },
  {
    label: '커뮤니티',
    path: '/community',
  },
  {
    label: '주거 정보 찾기',
    path: '/housing-search',
  },
  {
    label: '룸메이트',
    path: '/roommate',
  },
  {
    label: '정부 주거관련 정보',
    path: '/public-housing',
  },
];

export default function RootHeader() {
  const { data: user, isPending } = useGetMe();
  if (isPending) return <GlobalLoader />;
  return (
    <>
      <header className='flex justify-end bg-gray-300 pb-6'>
        <Sheet>
          <SheetTrigger className=''>
            <Menu className='m-4 size-7' />
          </SheetTrigger>
          <SheetContent className='w-1/2'>
            <SheetHeader className='gap-4'>
              <SheetTitle className='sr-only'>메뉴</SheetTitle>
              <SheetDescription className='sr-only'>메뉴 목록입니다.</SheetDescription>
              <Link to={`/profile/${user?.id}`}>
                <Avatar className='mx-auto size-20'>
                  <AvatarImage
                    src={
                      user?.profileImageUrl.startsWith('http')
                        ? user.profileImageUrl
                        : `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`
                    }
                  />
                  <AvatarFallback>profile</AvatarFallback>
                </Avatar>
              </Link>
              <div className='text-center text-xl'>{user?.nickname}</div>
              <Button asChild>
                <Link to={'/post-create'}>글쓰기</Link>
              </Button>
            </SheetHeader>
            <nav className='flex flex-col justify-center gap-4 px-4'>
              {nav.map((item) => (
                <SheetClose
                  asChild
                  key={item.label}>
                  <Link to={item.path}>
                    <div className='text-center'>{item.label}</div>
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetFooter>
              <Button>로그아웃</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
