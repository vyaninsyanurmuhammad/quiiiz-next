import { axiosAPI } from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const QuizCreateThunk = createAsyncThunk(
  'quiz/create',
  async (req: { topic: string; amount: number }) => {
    try {
      const { topic, amount } = req;

      const response = await axiosAPI.post(`/quiz`, {
        topic,
        amount,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response?.data.message,
        };
      }
    }
  },
);
