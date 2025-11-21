import {
  createPost,
  deletePost,
  getDetailPost,
  getMainPosts,
  getPosts,
  updatePost,
} from '@/apis/post';
import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { Filters, GetPostDetailRequest, PostCategory, UseMutationCallback } from '@/types';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

//토스트, 라우팅 등은 외부에서 주입

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 외부에서 커스텀 콜백
      //게시글 생성 -> 리스트 새로고침
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.lists(),
      });
      if (callbacks?.onSuccess) {
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

export function useUpdatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    //mutationFn은 인자 하나(variables)만 받는 함수여야 한다
    mutationFn: updatePost,
    onSuccess: () => {
      //여기서 공통 콜백
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.lists(),
      });
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

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      //여기서 공통 콜백
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.lists(),
      });
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

export function useGetPosts(category: PostCategory, filters?: Filters) {
  return useQuery({
    queryFn: () => getPosts({ category, filters }),
    queryKey: QUERY_KEYS.post.category(category, filters),
    placeholderData: keepPreviousData,
  });
}

export function useGetMainPosts() {
  return useQuery({
    queryFn: getMainPosts,
    queryKey: QUERY_KEYS.post.main(),
  });
}

export function useGetDetailPost({ category, id }: GetPostDetailRequest) {
  return useQuery({
    queryFn: () => getDetailPost({ category, id }),
    queryKey: QUERY_KEYS.post.detail(category, id),
  });
}
