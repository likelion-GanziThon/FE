import { postLogin, postSignup } from '@/apis/auth';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useSetLoggedIn } from '@/store/authStore';
import type { UseMutationCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useSignup(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error: Error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}

export function useLogin(callbacks?: UseMutationCallback) {
  const setLoggedIn = useSetLoggedIn();
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (accessToken) => {
      // 로컬 스토리지 저장 로직
      localStorage.setItem('accessToken', accessToken);
      // 로그인 세션
      setLoggedIn(true);
      // 키 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth.me(),
      });

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error: Error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
