import { logOnDev } from '@/utils/logOnDev';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000,
});

//요청 인터셉터
axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    const accessToken = localStorage.getItem('accessToken');

    //헤더에 토큰 추가
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    logOnDev(`
      [요청]:
      method: ${config.method},
      url: ${config.url},
      data: ${config.data},
      params: ${config.params},
        `);

    return config;
  },
  function (error: AxiosError) {
    logOnDev(`[API request error]: ${error.config}`);
    return Promise.reject(error);
  }
);
