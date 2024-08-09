import { axiosAPI } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const AuthSignInThunk = createAsyncThunk('auth/signIn', async () => {
  try {
    const response = await axiosAPI.get('/auth/login');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.message,
      };
    }
  }
});

export const AuthSignOutThunk = createAsyncThunk('auth/signOut', async () => {
  try {
    const response = await axiosAPI.get('/auth/logout');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.message,
      };
    }
  }
});

export const AuthCallbackThunk = createAsyncThunk(
  'auth/callback',
  async (req: { access_token: string }) => {
    try {
      const { access_token } = req;

      await axiosAPI.get(`/auth/callback?access_token=${access_token}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response?.data.message,
        };
      }
    }
  },
);
