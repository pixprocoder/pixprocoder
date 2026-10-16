'use server';

import { syncFirebaseUser } from '@/src/lib/auth';

export async function syncFirebaseUserAction(payload: {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
}) {
  return syncFirebaseUser(payload);
}
