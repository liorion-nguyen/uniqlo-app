import axios from 'axios';
import { envConfig } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = envConfig.serverURL;

const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = async (config: any) => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = (response: any) => response;

  const onResponseError = async (err: any) => {
    if (err) {
      let status = null;
      if (err.response) {
        status = err.response.status;
      }

      if (status === 403 || status === 401) {
        try {
          const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

          const newAccessToken = await axios.post(`${envConfig.serverURL}/auth/refresh-token`, {
            refreshToken,
          });

          await AsyncStorage.setItem(ACCESS_TOKEN, newAccessToken.data.accessToken);
          const originalRequest = err.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken.data.accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          await AsyncStorage.removeItem(ACCESS_TOKEN);
          await AsyncStorage.removeItem(REFRESH_TOKEN);
          onUnauthenticated();
        }
      }
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;