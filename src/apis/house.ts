import { axiosInstance } from '@/apis/axiosInstance';
import type { HousingRecommendationResponse } from '@/types';

export const getHouseRegion1 = async () => {
  const { data } = await axiosInstance.get('/api/housing/sido');
  return data;
};

export const getHouseRegion2 = async (sidoName: string) => {
  const cleanSido = sidoName.trim();
  const { data } = await axiosInstance.get('/api/housing/districts', {
    params: { sid: cleanSido },
  });
  return data;
};

interface PostRecommendRequest {
  sido: string;
  districts: string[];
  prompt: string;
}

export const postRecommend = async (
  body: PostRecommendRequest
): Promise<HousingRecommendationResponse> => {
  const { data } = await axiosInstance.post('/api/housing/recommend/v2', body);
  return data;
};
