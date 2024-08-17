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

export const QuizFindThunk = createAsyncThunk(
  'quiz/find',
  async (req: { quizId: string }) => {
    try {
      const { quizId } = req;

      const response = await axiosAPI.get(`/quiz/${quizId}`);

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

export const QuizStartThunk = createAsyncThunk(
  'quiz/start',
  async (req: { quizId: string }) => {
    try {
      const { quizId } = req;

      const response = await axiosAPI.get(`/quiz/${quizId}/startOrContinue`);

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

export const QuizAnswerThunk = createAsyncThunk(
  'quiz/answer',
  async (req: {
    gameId: string;
    quizId: string;
    questionId: string;
    answer: string;
  }) => {
    try {
      const { gameId, quizId, questionId, answer } = req;

      const response = await axiosAPI.post(`/quiz/${quizId}/answer`, {
        gameId,
        questionId,
        answer,
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

export const QuizFinishThunk = createAsyncThunk(
  'quiz/finish',
  async (req: { gameId: string; quizId: string }) => {
    try {
      const { gameId, quizId } = req;

      const response = await axiosAPI.post(`/quiz/${quizId}/finish`, {
        gameId,
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
