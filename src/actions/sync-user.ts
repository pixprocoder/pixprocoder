'use server';

import { syncFirebaseUser } from '@/src/lib/auth';

export async function syncFirebaseUserAction(payload: {
  uid: string;
  email: string;
}) {
  return syncFirebaseUser(payload);
}
