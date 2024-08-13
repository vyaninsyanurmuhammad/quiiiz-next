import { createSlice } from '@reduxjs/toolkit';
import quizInitialState from './quiz.state';
import { QuizCreateThunk } from './quiz.thunk';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: quizInitialState,
  reducers: {},
  extraReducers(builder) {
    // create quiz
    builder.addCase(QuizCreateThunk.pending, (state) => {
      state.playState.isLoading = true;
    });
    builder.addCase(QuizCreateThunk.fulfilled, (state, action) => {
      state.playState.quiz = action.payload.data;
      state.playState.isLoading = false;
    });
  },
});

export const {} = quizSlice.actions;
export default quizSlice.reducer;
