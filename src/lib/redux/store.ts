import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/auth.slice';
import quizSlice from './features/quiz/quiz.slice';

export const store = configureStore({
  reducer: { authSlice, quizSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
