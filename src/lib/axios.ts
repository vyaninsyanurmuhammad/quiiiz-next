import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { decodeJwt } from 'jose';

export const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

axiosAPI.interceptors.request.use(
  (config) => {
    const token = getCookie('session');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosAPI.interceptors.response.use(
  async (response) => {
    const token = response.data.access_token;

    if (token) {
      const payload = await decodeJwt(token);

      const expires = new Date(payload.exp! * 1000);

      console.log(expires.toLocaleString());

      setCookie('session', token, {
        expires,
      });
    }

    return response;
  },
  (error) => Promise.reject(error),
);
