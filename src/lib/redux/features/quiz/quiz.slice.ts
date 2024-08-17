import { createSlice } from '@reduxjs/toolkit';
import quizInitialState from './quiz.state';
import {
  QuizAnswerThunk,
  QuizCreateThunk,
  QuizFindThunk,
  QuizFinishThunk,
  QuizStartThunk,
} from './quiz.thunk';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: quizInitialState,
  reducers: {
    resetAnswer: (state) => {
      state.playState.answer = undefined;
    },
    resetQuiz: (state) => {
      state.playState.quiz = undefined;
    },
  },
  extraReducers(builder) {
    // create quiz
    builder.addCase(QuizCreateThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizCreateThunk.fulfilled, (state, action) => {
      state.playState.quiz = action.payload.data;
      state.playState.isLoading = false;
    });
    // find quiz
    builder.addCase(QuizFindThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizFindThunk.fulfilled, (state, action) => {
      state.playState.quiz = action.payload.data;
      state.playState.isLoading = false;
    });
    // start quiz
    builder.addCase(QuizStartThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizStartThunk.fulfilled, (state, action) => {
      state.playState.quiz = action.payload.data;
      state.playState.isLoading = false;
    });
    // answer quiz
    builder.addCase(QuizAnswerThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizAnswerThunk.fulfilled, (state, action) => {
      state.playState.answer = action.payload.data;
      state.playState.isLoading = false;
    });
    // finish quiz
    builder.addCase(QuizFinishThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizFinishThunk.fulfilled, (state, action) => {
      state.playState.result = action.payload.data;
      state.playState.isLoading = false;
    });
  },
});

export const { resetAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
