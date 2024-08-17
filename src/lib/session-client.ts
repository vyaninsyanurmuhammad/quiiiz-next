import { getCookie } from 'cookies-next';
import { decodeJwt } from 'jose';

export function getSessionClient() {
  const session = getCookie('session');

  if (!session) return null;
  return decodeJwt(session);
}
