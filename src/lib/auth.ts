import { prisma, Role } from '@/src/lib/db/prisma';
import {
  isUniqueHandle,
  slugifyUsername,
  uniqueUsername,
} from '@/src/lib/username';

async function resolveUsername(
  current: string | null | undefined,
  displayName: string | null | undefined,
  uid: string,
) {
  if (isUniqueHandle(current) && displayName?.trim()) {
    const desired = slugifyUsername(displayName);
    if (current === desired || current.startsWith(`${desired}_`)) {
      return current;
    }
  } else if (isUniqueHandle(current) && !displayName?.trim()) {
    return current;
  }

  return uniqueUsername(displayName, {
    excludeUid: uid,
    fallback: uid.slice(-4),
  });
}

export async function syncFirebaseUser(payload: {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
}) {
  const { uid, email, displayName, photoURL } = payload;

  if (!uid?.trim() || !email?.trim()) {
    throw new Error('uid and email are required');
  }

  const photo = photoURL?.trim() || undefined;

  const byUid = await prisma.user.findUnique({ where: { uid } });
  if (byUid) {
    const username = await resolveUsername(byUid.username, displayName, uid);
    const user = await prisma.user.update({
      where: { uid },
      data: {
        email,
        username,
        ...(photo ? { avatar: photo } : {}),
        updatedAt: new Date(),
      },
    });
    return { role: user.role };
  }

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    const username = await resolveUsername(
      byEmail.username,
      displayName,
      byEmail.uid,
    );
    const user = await prisma.user.update({
      where: { email },
      data: {
        uid,
        username,
        ...(photo ? { avatar: photo } : {}),
        updatedAt: new Date(),
      },
    });
    return { role: user.role };
  }

  const username = await uniqueUsername(displayName, {
    fallback: uid.slice(-4),
  });

  const user = await prisma.user.create({
    data: {
      uid,
      email,
      username,
      ...(photo ? { avatar: photo } : {}),
      role: Role.USER,
    },
  });

  return { role: user.role };
}
