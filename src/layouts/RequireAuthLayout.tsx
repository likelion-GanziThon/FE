import { Navigate, Outlet } from 'react-router';
import { useIsLoggedIn } from '@/store/authStore';

export default function RequireAuthLayout() {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
      <Navigate
        to='/login'
        replace // 뒤로가기 방지
      />
    );
  }

  return <Outlet />;
}
