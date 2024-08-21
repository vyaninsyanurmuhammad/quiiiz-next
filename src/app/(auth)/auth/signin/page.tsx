'use client';

import Button3d from '@/components/button-3d';
import { Button } from '@/components/ui/button';
import { AuthSignInThunk } from '@/lib/redux/features/auth/auth.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { GoogleLogo } from '@phosphor-icons/react/dist/ssr';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SiGoogle } from 'react-icons/si';

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
    <main className="container flex h-svh w-svw items-center justify-center">
      <div className="flex max-w-[640px] flex-col gap-8 lg:min-w-[640px]">
        {/* <Button
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
        </Button> */}
        <div className="flex flex-col gap-4">
          <p className="text-6xl font-extrabold text-[#58a700]">
            Tantang Pengetahuanmu, Raih Skor Terbaik!
          </p>
          <p>Sign in hanya butuh kurang dari 2 menit</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button3d
            className="flex h-14 w-full flex-row items-center gap-3 border-[1px] border-[#58a700] bg-white px-10 text-slate-900"
            classNameShadow="bg-[#58a700]"
            onClick={onGoogleSignInClickHandler}
            disabled={authState.signInState.isLoading}
          >
            {authState.signInState.isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SiGoogle className="h-5 w-5 text-[#58a700]" />
            )}
            Sign In by Google
          </Button3d>
          <p>
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
