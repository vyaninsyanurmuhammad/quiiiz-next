'use client';

import { AuthCallbackThunk } from '@/lib/redux/features/auth/auth.thunk';
import { useAppDispatch } from '@/lib/redux/hook';
import { Detective } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const CallbackPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleRedirect = () => {
      const { hash } = window.location;
      if (hash) {
        // Parse hash and extract access_token
        const params = new URLSearchParams(hash.replace('#', ''));
        const access_token = params.get('access_token');

        if (access_token) {
          // Redirect to URL with query parameters
          dispatch(AuthCallbackThunk({ access_token })).then((data) => {
            router.push('/');
          });
        }
      } else {
        router.push('/auth/signin');
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="flex h-svh w-svw items-center justify-center">
      <div className="relative flex h-fit w-fit items-center justify-center">
        <Detective className="absolute z-10 h-16 w-16 animate-bounce [animation-duration:1000ms]" />
      </div>
    </div>
  );
};

export default CallbackPage;
