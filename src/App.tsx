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

import GuestOnlyLayout from '@/layouts/GuestOnlyLayout';
import RequireAuthLayout from '@/layouts/RequireAuthLayout';
import HeaderLayout from '@/layouts/HeaderLayout';
import GlobalLayout from '@/layouts/GlobalLayout';

function App() {
  const router = createBrowserRouter([
    {
      element: <GlobalLayout />,
      children: [
        {
          element: <RequireAuthLayout />,
          children: [
            {
              path: '/',
              element: <HeaderLayout />,
              children: [
                { index: true, element: <HomePage /> },
                { path: 'community', element: <CommunityPage /> },
                { path: 'housing-search', element: <HousingSearchPage /> },
                { path: 'roommate', element: <RoommatePage /> },
                { path: 'public-housing', element: <PublicHousingPage /> },
                { path: 'profile/:userId', element: <ProfilePage /> },
              ],
            },
            { path: 'post-create', element: <PostCreatePage /> },

            { path: 'profile/:userId/update', element: <ProfileUpdatePage /> },
            { path: 'post/:category/:id', element: <PostDetailPage /> },
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
