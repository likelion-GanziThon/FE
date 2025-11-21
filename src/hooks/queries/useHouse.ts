import { getHouseRegion1, getHouseRegion2, postRecommend } from '@/apis/house';
import type { UseMutationCallback } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetRegion1() {
  return useQuery({
    queryFn: getHouseRegion1,
    queryKey: ['region', 'region1'],
    staleTime: Infinity,
  });
}

export function useGetRegion2(sidoName: string) {
  return useQuery({
    queryFn: () => getHouseRegion2(sidoName),
    queryKey: ['region', 'region2', sidoName],
    staleTime: Infinity,
    enabled: !!sidoName,
  });
}

export function useRecommendHouse(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: postRecommend,
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
