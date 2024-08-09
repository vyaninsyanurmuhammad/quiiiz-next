'use client';

import { Button } from '@/components/ui/button';
import { AuthSignInThunk } from '@/lib/redux/features/auth/auth.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authState = useAppSelector((state) => state.authSlice);

  const onGoogleSignInClickHandler = () => {
    dispatch(AuthSignInThunk()).then((data) => {
      router.push(data.payload.redirectUrl);
    });
  };

  return (
    <div className="flex h-svh w-svw items-center justify-center">
      <Button
        className="flex h-fit gap-2 p-4"
        onClick={onGoogleSignInClickHandler}
        disabled={authState.signInState.isLoading}
      >
        {authState.signInState.isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GoogleLogo className="h-5 w-5" />
        )}{' '}
        Sign In by Google
      </Button>
    </div>
  );
};

export default SignInPage;
