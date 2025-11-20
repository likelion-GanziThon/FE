import RootHeader from '@/components/common/RootHeader';
import { Outlet } from 'react-router';

export default function HeaderLayout() {
  return (
    <>
      <RootHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
