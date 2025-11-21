import { Outlet } from 'react-router';

export default function GlobalLayout() {
  return (
    <div className='m-auto flex min-h-screen w-full max-w-175 flex-1 flex-col border'>
      <Outlet />
    </div>
  );
}
