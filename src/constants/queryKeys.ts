import type { PostCategory, PostListFilters } from '@/types';

export const QUERY_KEYS = {
  post: {
    all: ['post'],
    lists: () => ['post', 'list'], // 게시글 리스트 (글을 새로 만들었을 때 초기화)
    //필터링된 리스트
    list: (category: PostCategory, filters?: PostListFilters) => [
      'post',
      'list',
      category,
      filters,
    ],
  },
};
