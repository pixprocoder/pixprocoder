import { prisma } from '@/src/lib/db/prisma';

/** Single-word handle: letters, numbers, underscores. */
export const USERNAME_RE = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;

export function slugifyUsername(displayName: string): string {
  const slug = displayName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24);
  return slug || 'user';
}

export function isUniqueHandle(value: string | null | undefined): value is string {
  return Boolean(value && USERNAME_RE.test(value) && !isLongFallbackHandle(value));
}

/** Old backfill: user_ + full ObjectId. Too long; regenerate. */
export function isLongFallbackHandle(value: string): boolean {
  return /^user_[a-z0-9]{8,}$/.test(value);
}



export async function uniqueUsername(
  displayName: string | null | undefined,
  opts?: { excludeUid?: string; fallback?: string },
): Promise<string> {
  const name = displayName?.trim();
  const tail = (opts?.fallback || 'user')
    .replace(/[^a-z0-9]/gi, '')
    .slice(-4)
    .toLowerCase();
  const base = name ? slugifyUsername(name) : `user_${tail || 'user'}`;

  const taken = async (candidate: string) => {
    const existing = await prisma.user.findFirst({
      where: {
        username: candidate,
        ...(opts?.excludeUid ? { uid: { not: opts.excludeUid } } : {}),
      },
      select: { id: true },
    });
    return Boolean(existing);
  };

  if (!(await taken(base))) return base;

  for (let n = 2; n < 50; n += 1) {
    const candidate = `${base}_${n}`.slice(0, 32);
    if (!(await taken(candidate))) return candidate;
  }

  return `${base}_${Date.now().toString(36)}`.slice(0, 32);
}
