'use client';

import { AuthCallbackThunk } from '@/lib/redux/features/auth/auth.thunk';
import { useAppDispatch } from '@/lib/redux/hook';
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
            router.push("/")
        });
        }
      }
    };

    handleRedirect();
  }, [router]);

  return <div>loading...</div>;
};

export default CallbackPage;
