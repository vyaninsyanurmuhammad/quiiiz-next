import axios from 'axios';
import { getCookie } from 'cookies-next';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { axiosAPI } from './axios';
import { NextRequest, NextResponse } from 'next/server';

export async function getSessionClient() {
  const session = getCookie('session');

  if (!session) return null;
  return await decodeJwt(session);
}

export async function getSessionServer() {
  const session = cookies().get('session')?.value;

  if (!session) return null;
  return await decodeJwt(session);
}

export async function refreshSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return NextResponse.next();

  try {
    const response = await axiosAPI.get('/auth/refresh-token', {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const jwt = response.data.access_token;

    if (jwt) {
      const payload = await decodeJwt(jwt);

      const expires = new Date(payload.exp! * 1000);

      const res = NextResponse.next();

      res.cookies.set('session', jwt, {
        httpOnly: true,
        path: '/',
        expires,
      });

      return res; // Return the response after setting the cookies
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error', error.response?.data.message);
    }
  }

  return NextResponse.next(); // Proceed to the next response if refresh fails
}
