import { createSlice } from '@reduxjs/toolkit';
import authInitialState from './auth.state';
import { AuthSignInThunk, AuthSignOutThunk } from './auth.thunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    // login
    builder.addCase(AuthSignInThunk.pending, (state) => {
      state.signInState.isLoading = true;
    });
    builder.addCase(AuthSignInThunk.fulfilled, (state, action) => {
      state.signInState.redirectUrl = action.payload;
      state.signInState.isLoading = false;
    });
    // logout
    builder.addCase(AuthSignOutThunk.pending, (state) => {
      state.signOutState.isLoading = true;
    });
    builder.addCase(AuthSignOutThunk.fulfilled, (state) => {
      state.signOutState.isLoading = false;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
