import { getMe, getOtherProfile, updateProfile } from '@/apis/profile';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { UseMutationCallback } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetMe() {
  return useQuery({
    queryFn: getMe,
    queryKey: QUERY_KEYS.auth.me(),
    staleTime: 1000 * 60 * 60, // 1시간 동안 캐시 데이터 사용 (전역 상태 효과)
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false, // 탭 전환할 때마다 재요청 안 함
    retry: 0,
  });
}

export function useUpdateProfile(userId?: number, callbacks?: UseMutationCallback) {
  return useMutation({
    //mutationFn은 인자 하나(variables)만 받는 함수여야 한다
    mutationFn: updateProfile,
    onSuccess: () => {
      //여기서 공통 콜백
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth.me(),
      });
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.auth.userProfile(userId),
        });
      }
      if (callbacks?.onSuccess) {
        // 외부에서 커스텀 콜백
        callbacks.onSuccess();
      }
    },
    onError: (error: Error) => {
      //여기서 공통 콜백
      if (callbacks?.onError) {
        // 외부에서 커스텀 콜백
        callbacks.onError(error);
      }
    },
  });
}

//TODO: 나중에 카드에다가 연결
export function useGetOtherProfile(userId: number) {
  return useQuery({
    queryFn: () => getOtherProfile(userId),
    queryKey: QUERY_KEYS.auth.userProfile(userId),
  });
}
