import { axiosInstance } from '@/apis/axiosInstance';
import type {
  CreatePostRequest,
  Filters,
  GetPostDetailRequest,
  GetPostsResponse,
  Post,
  PostCategory,
  PostDetail,
  UpdatePostRequest,
} from '@/types';

//게시글 생성 요청
export const createPost = async (body: CreatePostRequest): Promise<void> => {
  const formData = new FormData();

  formData.append('category', body.category);
  formData.append('title', body.title);
  formData.append('content', body.content);

  if (body.sidoCode) formData.append('sidoCode', body.sidoCode);
  if (body.sigunguCode) formData.append('sigunguCode', body.sigunguCode);
  if (body.openchatUrl) formData.append('openchatUrl', body.openchatUrl);

  body.images?.forEach((image) => {
    formData.append('images', image);
  });

  await axiosInstance.post('/api/posts', formData);
};

interface UpdatePostVariables {
  id: number;
  currentCategory: PostCategory;
  body: UpdatePostRequest;
}

//게시글 수정 요청
export const updatePost = async ({
  id,
  currentCategory,
  body,
}: UpdatePostVariables): Promise<void> => {
  const formData = new FormData();

  formData.append('newCategory', body.newCategory);
  formData.append('title', body.title);
  formData.append('content', body.content);

  if (body.sidoCode) formData.append('sidoCode', body.sidoCode);
  if (body.sigunguCode) formData.append('sigunguCode', body.sigunguCode);
  if (body.openchatUrl) formData.append('openchatUrl', body.openchatUrl);

  body.images?.forEach((image) => {
    formData.append('images', image);
  });

  await axiosInstance.put(`/api/posts/${id}`, formData, {
    params: { category: currentCategory },
  });
};

interface DeletePostVariables {
  category: PostCategory;
  id: number;
}

//게시글 삭제 요청
export const deletePost = async ({ category, id }: DeletePostVariables): Promise<void> => {
  await axiosInstance.delete(`/api/posts/${category}/${id}`);
};

interface GetPostsVariables {
  category: PostCategory;
  page?: number;
  size?: number;
  filters?: Filters;
}

//게시글 조회 요청
export const getPosts = async ({
  category,
  page = 0,
  size = 20,
  filters,
}: GetPostsVariables): Promise<GetPostsResponse> => {
  const { data } = await axiosInstance.get(`/api/posts/${category}`, {
    params: { size, page, ...filters },
  });
  return data;
};

interface GetMainPostsResponse {
  roommate: Post[];
  free: Post[];
  policy: Post[];
}

//메인페이지 게시글 조회
export const getMainPosts = async (): Promise<GetMainPostsResponse> => {
  const { data } = await axiosInstance.get('/api/posts/main');
  return data;
};

// 게시글 상세 조회
export const getDetailPost = async ({
  category,
  id,
}: GetPostDetailRequest): Promise<PostDetail> => {
  const { data } = await axiosInstance.get(`/api/posts/${category}/${id}`);
  console.log(data);
  return data;
};
