import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

// 페이지
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import HousingSearchPage from './pages/HousingSearchPage';
import RoommatePage from './pages/RoommatePage';
import PublicHousingPage from './pages/PublicHousingPage';
import ProfilePage from './pages/ProfilePage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';

import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

//레이아웃

import ProfileUpdatePage from '@/pages/ProfileUpdatePage';
import RootLayout from '@/layouts/RootLayout';
import GuestOnlyLayout from '@/layouts/GuestOnlyLayout';
import RequireAuthLayout from '@/layouts/RequireAuthLayout';

function App() {
  const router = createBrowserRouter([
    {
      element: <RequireAuthLayout />,
      children: [
        {
          path: '/',
          element: <RootLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'community', element: <CommunityPage /> },
            { path: 'housing-search', element: <HousingSearchPage /> },
            { path: 'roommate', element: <RoommatePage /> },
            { path: 'public-housing', element: <PublicHousingPage /> },
          ],
        },

        { path: 'post-create', element: <PostCreatePage /> },
        { path: 'profile/:userId', element: <ProfilePage /> },
        { path: 'profile/:userId/update', element: <ProfileUpdatePage /> },
        { path: 'post/:category/:postId', element: <PostDetailPage /> },
      ],
    },

    {
      element: <GuestOnlyLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
      ],
    },

    {
      path: '*',
      element: (
        <Navigate
          to='/'
          replace
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
