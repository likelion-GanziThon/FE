import { axiosInstance } from '@/apis/axiosInstance';
import type { PostRecommendRequest, RecommendationItem } from '@/types/housing.type';

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

export const postRecommend = async (
  body: PostRecommendRequest
): Promise<{
  recommendations: RecommendationItem[];
}> => {
  const { data } = await axiosInstance.post('/api/housing/recommend/v2', body);
  return data;
};
