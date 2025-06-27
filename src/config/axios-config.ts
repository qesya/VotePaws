import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { router } from "expo-router";
import { APP_CONFIG } from "./app-config";

const publicAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const authAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const authUploadAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    "x-api-key": APP_CONFIG.CAT_API_KEY,
  },
});

authAxios.interceptors.request.use(
  async (config: any) => {
    try {
      const apiKey = APP_CONFIG.CAT_API_KEY;

      if (apiKey) {
        config.headers = {
          ...config.headers,
          "x-api-key": apiKey,
        };
      }
    } catch (error) {
      console.error("Error fetching the access token", error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newSession = "";
        console.log("session", newSession);

        if (newSession) {
          originalRequest.headers = {
            ...originalRequest.headers,
            "x-api-key": APP_CONFIG.CAT_API_KEY,
          };
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error(
          "Error refreshing the access token",
          JSON.stringify(refreshError),
        );

        router.replace({
          pathname: "/",
        });
      }
    }
    return Promise.reject(error);
  },
);

export { authAxios, authUploadAxios, publicAxios };
