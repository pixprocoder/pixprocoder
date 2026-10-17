import { apiJson } from '@/src/lib/api-response';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const FIREBASE_JWKS = createRemoteJWKSet(
  new URL(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
  ),
);

export class AuthError extends Error {
  constructor(
    message = 'Sign in required',
    readonly status = 401,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function requireFirebaseUid(req: Request): Promise<string> {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new AuthError('Sign in required');

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) throw new AuthError('Auth is not configured', 500);

  try {
    const { payload } = await jwtVerify(token, FIREBASE_JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    const uid = typeof payload.sub === 'string' ? payload.sub.trim() : '';
    if (!uid) throw new AuthError('Invalid session');
    return uid;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Invalid or expired session');
  }
}

export function authJson(error: unknown) {
  if (!(error instanceof AuthError)) return null;
  return apiJson({
    statusCode: error.status,
    success: false,
    message: error.message,
  });
}
