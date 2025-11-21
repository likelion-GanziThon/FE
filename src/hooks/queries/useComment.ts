import { createComment, deleteComment } from '@/apis/comment';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { CreateCommentRequest, UseMutationCallback } from '@/types';
import { useMutation } from '@tanstack/react-query';

export function useCreateComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: ({ category, id, content }: CreateCommentRequest) =>
      createComment({ category, id, content }),
    onSuccess: (_, { category, id }) => {
      // 댓글 생성 성공 시, variables로 전달된 category, id를 사용해 해당 게시글 상세 쿼리만 무효화.(mutationFn에서 사용된 매개변수가 들어간다.)
      // mutation 응답 데이터(data)는 사용하지 않아 첫 번째 인자는 _로 무시 처리 (onSuccess첫 번째 매개변수는 mutationFn의 리턴값이 들어간다. 이거 사용 안하니 _로 명시)
      // 댓글 생성 -> 해당 게시글 초기화
      //TODO: 이거 그냥 외부에서 주입해도 되나?
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(category, id),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.category(category),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.main(),
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

export function useDeleteComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
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
