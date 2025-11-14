import RootHeader from '@/components/common/RootHeader';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <>
      <RootHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
