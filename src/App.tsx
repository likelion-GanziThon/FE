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
import RootLayout from './layouts/RootLayout';

function App() {
  const router = createBrowserRouter([
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
    { path: 'post/:category/:postId', element: <PostDetailPage /> },

    { path: 'login', element: <LoginPage /> },
    { path: 'sign-up', element: <SignUpPage /> },

    { path: '*', element: <Navigate to={'/'} /> }, // 이상한 경로는 홈으로 리디렉션
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
