import { prisma, Role } from '@/src/lib/db/prisma';

export async function syncFirebaseUser(payload: {
  uid: string;
  email: string;
}) {
  const { uid, email } = payload;

  if (!uid?.trim() || !email?.trim()) {
    throw new Error('uid and email are required');
  }

  const byUid = await prisma.user.findUnique({ where: { uid } });
  if (byUid) {
    const user = await prisma.user.update({
      where: { uid },
      data: { email, updatedAt: new Date() },
    });
    return { role: user.role };
  }

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    const user = await prisma.user.update({
      where: { email },
      data: { uid, updatedAt: new Date() },
    });
    return { role: user.role };
  }

  const user = await prisma.user.create({
    data: {
      uid,
      email,
      username: '',
      password: '',
      role: Role.USER,
    },
  });

  return { role: user.role };
}
