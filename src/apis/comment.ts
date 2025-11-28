import { axiosInstance } from '@/apis/axiosInstance';
import type { CreateCommentRequest } from '@/types/post.type';

export const createComment = async ({ category, id, content }: CreateCommentRequest) => {
  await axiosInstance.post(`/api/posts/${category}/${id}/comments`, { content });
};

export const deleteComment = async (commentId: number) => {
  await axiosInstance.delete(`/api/posts/comments/${commentId}`);
};
