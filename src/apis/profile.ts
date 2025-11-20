import { axiosInstance } from '@/apis/axiosInstance';
import type { ProfileFields, User } from '@/types';

// 내 정보 조회
export const getMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get('/api/profile/me');
  return data;
};

export interface UpdateProfile extends ProfileFields {
  profileImageUrl?: File | null;
}

// 내 정보 수정 (이미지 있음)
export const updateProfile = async (body: UpdateProfile): Promise<User> => {
  const formData = new FormData();
  if (body.desiredArea) formData.append('desiredArea', body.desiredArea);
  if (body.desiredMoveInDate) formData.append('desiredMoveInDate', body.desiredMoveInDate);
  if (body.introduction) formData.append('introduction', body.introduction);
  if (body.profileImageUrl) formData.append('profileImage', body.profileImageUrl);

  const { data } = await axiosInstance.put('/api/profile/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// 다른 유저 프로필 정보 조회
export const getOtherProfile = async (userId: number): Promise<User> => {
  const { data } = await axiosInstance.get(`/api/profile/${userId}`);
  return data;
};
