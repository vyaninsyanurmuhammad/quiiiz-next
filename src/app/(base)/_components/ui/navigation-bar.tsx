'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { AuthSignOutThunk } from '@/lib/redux/features/auth/auth.thunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NavigationBar = ({ className }: { className?: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.authSlice);

  const onSignOutClickHandler = () => {
    dispatch(AuthSignOutThunk()).then(() => {
      router.push('/auth/signin');
    });
  };

  return (
    <div
      className={cn(
        className,
        'flex h-fit w-full justify-between border-b-[1px] bg-white py-4',
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Detective className="h-8 w-8" />
          <p className="text-xl font-semibold">Quiiiz</p>
        </div>
        <Button>Sign In</Button>

        {/* <Button
        onClick={onSignOutClickHandler}
        disabled={authState.signOutState.isLoading}
      >
        {authState.signOutState.isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Sign Out'
        )}
      </Button> */}
      </div>
    </div>
  );
};

export default NavigationBar;
