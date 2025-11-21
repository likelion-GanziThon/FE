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
  images?: File[] | null;
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

export interface GetPostDetailRequest {
  category: PostCategory;
  id: number;
}

export interface CreateCommentRequest extends GetPostDetailRequest {
  content: string;
}

// mutation 훅 콜백 함수 타입
export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

//프로필 정보 타입
export interface ProfileFields {
  desiredArea: string | null;
  desiredMoveInDate: string | null;
  introduction: string | null;
}

// 유저 타입
export interface User extends ProfileFields {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

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

export interface HousingInfo {
  id: number;
  /** 단지 일련번호 (문자열로 들어오는 점 주의) */
  hsmpSn: string;
  /** 광역시/도 명 (예: 경기도) */
  brtcNm: string;
  /** 시/군/구 명 (예: 성남시 분당구) */
  signguNm: string;
  /** 단지 명 (예: 판교해링턴 플레이스) */
  hsmpNm: string;
  /** 세대 수 */
  hshldCo: number;
  /** 기본 임대 보증금 (원 단위) */
  bassRentGtn: number;
  /** 기본 월 임대료 (원 단위) */
  bassMtRntchrg: number;
}

export interface RecommendationItem {
  /** 추천 순위 */
  rank: number;
  /** 주택 상세 정보 객체 */
  housingInfo: HousingInfo;
  /** 추천 사유 */
  reason: string;
}

export interface HousingRecommendationResponse {
  recommendations: RecommendationItem[];
}
