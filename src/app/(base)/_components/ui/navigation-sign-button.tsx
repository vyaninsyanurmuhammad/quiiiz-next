'use client';

import { Button } from '@/components/ui/button';
import { getSessionClient } from '@/lib/session-client';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { Loader2 } from 'lucide-react';
import { AuthSignOutThunk } from '@/lib/redux/features/auth/auth.thunk';
import { deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { JWTPayload } from 'jose';

const NavigationSignButton = () => {
  const router = useRouter();
  const [session, setSession] = useState<JWTPayload | null>();

  // getSessionClient();
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.authSlice);

  const onSignInClickHandler = () => {
    router.push('/auth/signin');
  };

  const onSignOutClickHandler = () => {
    dispatch(AuthSignOutThunk()).then(() => {
      deleteCookie('session');
      setSession(undefined);
      router.push('/');
    });
  };

  useEffect(() => {
    setSession(getSessionClient());
  }, [getSessionClient]);

  return session ? (
    <Button
      className="bg-destructive"
      onClick={onSignOutClickHandler}
      disabled={authState.signOutState.isLoading}
    >
      {authState.signOutState.isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        'Sign Out'
      )}
    </Button>
  ) : (
    <Button onClick={onSignInClickHandler}>Sign In</Button>
  );
};

export default NavigationSignButton;
