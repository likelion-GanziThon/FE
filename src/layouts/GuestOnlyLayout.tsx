import { useIsLoggedIn } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

export default function GuestOnlyLayout() {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return (
      <Navigate
        to='/'
        replace // 뒤로가기 방지
      />
    );
  }

  return <Outlet />;
}
