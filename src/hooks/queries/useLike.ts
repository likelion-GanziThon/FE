import { createLike } from '@/apis/like';
import type { GetPostDetailRequest, UseMutationCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useCreateLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: ({ category, id }: GetPostDetailRequest) => createLike({ category, id }),
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
