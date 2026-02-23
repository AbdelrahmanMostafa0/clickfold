import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      return api(original);
    }

    return Promise.reject(error);
  },
);

export default api;
