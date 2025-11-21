import type { Filters, PostCategory } from '@/types';

export const QUERY_KEYS = {
  post: {
    all: ['post'],
    main: () => ['post', 'main'],
    lists: () => ['post', 'list'], // 게시글 리스트 (글을 새로 만들었을 때 초기화)
    //필터링된 리스트
    list: (category: PostCategory, size?: number, page?: number, filters?: Filters) => [
      'post',
      'list',
      category,
      { page, size, ...filters },
    ],
    details: () => ['post', 'detail'],
    detail: (category: PostCategory, id: number) => ['post', 'detail', category, id],
  },
  auth: {
    all: ['auth'],
    me: () => ['auth', 'me'],
    userProfile: (userId: number) => ['auth', 'profile', userId],
  },
};
