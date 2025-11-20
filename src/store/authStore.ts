import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

interface State {
  isLoggedIn: boolean;
}

const initialStates: State = {
  isLoggedIn: !!localStorage.getItem('accessToken'), // 토큰 확인
};

const useAuthStore = create(
  devtools(
    combine(initialStates, (set) => ({
      action: {
        // 로그인-로그아웃
        setLoggedIn: (value: boolean) => {
          set({ isLoggedIn: value });
        },
      },
    })),
    {
      name: 'sessionStore', // devtools
    }
  )
);

export const useIsLoggedIn = () => {
  const isLoggedIn = useAuthStore((store) => store.isLoggedIn);
  return isLoggedIn;
};
export const useSetLoggedIn = () => {
  const setLoggedIn = useAuthStore((store) => store.action.setLoggedIn);
  return setLoggedIn;
};
