export const signInState: SignInState = {
  isLoading: false,
};

export const signOutState: SignOutState = {
  isLoading: false,
};

const authInitialState: AuthInitialState = {
  signInState,
  signOutState,
};

export default authInitialState;
