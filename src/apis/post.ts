import { axiosInstance } from '@/apis/axiosInstance';
import type {
  CreatePostRequest,
  GetPostsParams,
  GetPostsResponse,
  PostCategory,
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

  await axiosInstance.post('/posts', formData);
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

  await axiosInstance.put(`/posts/${id}`, formData, {
    params: { category: currentCategory },
  });
};

interface DeletePostVariables {
  category: PostCategory;
  id: number;
}

//게시글 삭제 요청
export const deletePost = async ({ category, id }: DeletePostVariables): Promise<void> => {
  await axiosInstance.delete(`/posts/${category}/${id}`);
};

interface GetPostsVariables {
  category: PostCategory;
  params?: GetPostsParams;
}

//게시글 조회 요청
export const getPosts = async ({
  category,
  params,
}: GetPostsVariables): Promise<GetPostsResponse> => {
  const { data } = await axiosInstance.get(`/posts/${category}`, { params });
  return data;
};
