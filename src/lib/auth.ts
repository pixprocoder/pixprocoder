import { prisma, Role } from '@/src/lib/db/prisma';

function profileFields(displayName?: string | null, photoURL?: string | null) {
  const data: { username?: string; avatar?: string } = {};
  const name = displayName?.trim();
  const photo = photoURL?.trim();
  if (name) data.username = name;
  if (photo) data.avatar = photo;
  return data;
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

  const profile = profileFields(displayName, photoURL);

  const byUid = await prisma.user.findUnique({ where: { uid } });
  if (byUid) {
    const user = await prisma.user.update({
      where: { uid },
      data: { email, ...profile, updatedAt: new Date() },
    });
    return { role: user.role };
  }

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    const user = await prisma.user.update({
      where: { email },
      data: { uid, ...profile, updatedAt: new Date() },
    });
    return { role: user.role };
  }

  const user = await prisma.user.create({
    data: {
      uid,
      email,
      role: Role.USER,
      ...profile,
    },
  });

  return { role: user.role };
}
