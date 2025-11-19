import { axiosInstance } from '@/apis/axiosInstance';
import type { AuthRequest } from '@/types';

// 회원가입
export const postSignup = async (body: AuthRequest): Promise<void> => {
  await axiosInstance.post('/auth/register', body);
};

// 로그인
export const postLogin = async (body: AuthRequest): Promise<string> => {
  const { data } = await axiosInstance.post('/auth/login', body);
  return data.accessToken;
};
