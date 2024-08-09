interface SignInState {
  isLoading: boolean;
  redirectUrl?: string;
}

interface SignOutState {
  isLoading: boolean;
}

interface AuthInitialState {
  signInState: SignInState;
  signOutState: SignOutState;
}
