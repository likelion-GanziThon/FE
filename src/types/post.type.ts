// 게시글 타입
export interface Post {
  id: number;
  title: string;
  userId: number;
  viewCount: number;
  createdAt: string;
  commentCount: number;
  thumbnailUrl?: string;
  writerLoginId?: string;
}

//게시글 카테고리 타입
export type PostCategory = 'ROOMMATE' | 'FREE' | 'POLICY';

// 댓글 타입
export interface Comment {
  id: number;
  userId: number;
  writerLoginId: string;
  writerProfileImagePath: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetail {
  id: number;
  title: string;
  content: string;
  userId: number;
  writerLoginId: string;
  writerProfileImagePath: string | null;
  viewCount: number;
  createdAt: string;
  category: PostCategory;
  imageUrls: string[];
  openchatUrl: string | null;
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
  comments: Comment[];
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

// 공통 폼 필드
interface BasePostFormFields {
  title: string;
  content: string;
  sidoCode?: string;
  sigunguCode?: string;
  openchatUrl?: string;
  images?: File[] | null;
}

// DTO
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

export interface GetPostDetailRequest {
  category: PostCategory;
  id: number;
}

export interface CreateCommentRequest extends GetPostDetailRequest {
  content: string;
}

// 생성 요청
export interface CreatePostRequest extends BasePostFormFields {
  category: PostCategory;
}

// 수정 요청
export interface UpdatePostRequest extends BasePostFormFields {
  newCategory: PostCategory;
}

export interface UpdatePostVariables {
  id: number;
  currentCategory: PostCategory;
  body: UpdatePostRequest;
}

export interface DeletePostVariables {
  category: PostCategory;
  id: number;
}

export interface GetPostsVariables {
  category: PostCategory;
  page?: number;
  size?: number;
  filters?: Filters;
}

export interface GetMainPostsResponse {
  roommate: Post[];
  free: Post[];
  policy: Post[];
}
