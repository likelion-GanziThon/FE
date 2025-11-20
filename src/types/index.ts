// 로그인 회원가입 요청 타입
export interface AuthRequest {
  id: string;
  password: string;
}

//게시글 카테고리 타입
export type PostCategory = 'ROOMMATE' | 'FREE' | 'POLICY';

// 공통 폼 필드
interface BasePostFormFields {
  title: string;
  content: string;
  sidoCode?: string;
  sigunguCode?: string;
  openchatUrl?: string;
  images?: File[];
}

// 생성 요청
export interface CreatePostRequest extends BasePostFormFields {
  category: PostCategory;
}

// 수정 요청
export interface UpdatePostRequest extends BasePostFormFields {
  newCategory: PostCategory;
}

// 게시글 타입
export interface Post {
  id: number;
  title: string;
  userId: number;
  viewCount: number;
  createdAt: string;
  commentCount: number;
  thumbnailUrl?: string;
}

// 게시글 목록 조회 응답 타입
export interface GetPostsResponse {
  content: Post[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 검색 타입
export type SearchType = 'TITLE' | 'CONTENT';

// 게시글 필터 타입
export interface Filters {
  searchType?: SearchType;
  keyword?: string;
  sido?: string;
  sigungu?: string;
}

// mutation 훅 콜백 함수 타입
export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
