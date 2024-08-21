import { createSlice } from '@reduxjs/toolkit';
import quizInitialState from './quiz.state';
import {
  QuizAnswerThunk,
  QuizCreateThunk,
  QuizFindAllThunk,
  QuizFindAllTopicsThunk,
  QuizFindThunk,
  QuizFinishThunk,
  QuizStartThunk,
  QuizSummaryThunk,
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
    setLoading: (state, action) => {
      state.playState.isLoading = action.payload;
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
    builder.addCase(QuizCreateThunk.rejected, (state, action) => {
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
    builder.addCase(QuizFindThunk.rejected, (state, action) => {
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
    builder.addCase(QuizStartThunk.rejected, (state, action) => {
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
    builder.addCase(QuizAnswerThunk.rejected, (state, action) => {
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
    builder.addCase(QuizFinishThunk.rejected, (state, action) => {
      state.playState.isLoading = false;
    });
    // find all quiz
    builder.addCase(QuizFindAllThunk.pending, (state) => {});
    builder.addCase(QuizFindAllThunk.fulfilled, (state, action) => {
      state.playState.quizes = action.payload.data;
    });
    // find all topics
    builder.addCase(QuizFindAllTopicsThunk.pending, (state) => {
      state.homeState.isLoading = true;
    });
    builder.addCase(QuizFindAllTopicsThunk.fulfilled, (state, action) => {
      state.homeState.topics = action.payload.data;
      state.homeState.isLoading = false;
    });
    builder.addCase(QuizFindAllTopicsThunk.rejected, (state, action) => {
      state.homeState.isLoading = false;
    });
    // find summary
    builder.addCase(QuizSummaryThunk.pending, (state) => {
      state.summaryState.isLoading = true;
    });
    builder.addCase(QuizSummaryThunk.fulfilled, (state, action) => {
      state.summaryState.topScore = action.payload.data.top_score;
      state.summaryState.latestScore = action.payload.data.latest_score;
      state.summaryState.summaries = action.payload.data.summaries;
      state.summaryState.isLoading = false;
    });
    builder.addCase(QuizSummaryThunk.rejected, (state, action) => {
      state.summaryState.isLoading = false;
    });
  },
});

export const { resetAnswer, resetQuiz, setLoading } = quizSlice.actions;
export default quizSlice.reducer;
