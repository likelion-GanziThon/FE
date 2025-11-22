import { createLike } from '@/apis/like';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { GetPostDetailRequest, UseMutationCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useCreateLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: ({ category, id }: GetPostDetailRequest) => createLike({ category, id }),
    onSuccess: (_, { category, id }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(category, id),
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
