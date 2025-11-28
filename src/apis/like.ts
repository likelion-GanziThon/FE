import { axiosInstance } from '@/apis/axiosInstance';
import type { GetPostDetailRequest } from '@/types/post.type';

export const createLike = async ({ category, id }: GetPostDetailRequest) => {
  await axiosInstance.post(`/api/posts/${category}/${id}/likes`);
};
