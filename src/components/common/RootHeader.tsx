import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import logo from '@/assets/react.svg';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router';
import { Button } from '../ui/button';

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
  return (
    <>
      <header className='flex justify-end bg-gray-300 pb-6'>
        <NavigationMenu
          className='hidden w-full max-w-none sm:flex'
          // max-w-none을 줘야 너비가 들어난다.
        >
          <NavigationMenuList
            className='gap-5'
            // flex-wrap : 한 줄에 다 안 들어가면 다음 줄로 내려가게
          >
            {nav.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                  <Link to={item.path}>
                    <div className=''>{item.label}</div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Sheet
        //뷰포트 ≥ 768px일 때 안 보임
        >
          <SheetTrigger className='sm:hidden'>
            <Menu className='m-4 size-7' />
          </SheetTrigger>
          <SheetContent className='w-1/2 sm:hidden'>
            <SheetHeader className='gap-4'>
              <div className='m-auto size-20 rounded-full border border-black'>
                <img
                  src={logo}
                  alt='프로필'
                  className='h-full w-full'
                />
              </div>
              <div className='text-center text-xl'>임재준</div>
              <Button>글쓰기</Button>
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
