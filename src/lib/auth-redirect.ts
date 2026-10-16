const AUTH_PATHS = new Set(['/login', '/signup']);

export function isSafeNextPath(value: string | null | undefined): value is string {
  if (!value) return false;
  if (!value.startsWith('/')) return false;
  if (value.startsWith('//')) return false;
  const path = value.split('?')[0] ?? value;
  if (AUTH_PATHS.has(path)) return false;
  return true;
}

export function safeNextPath(
  value: string | null | undefined,
  fallback = '/',
): string {
  return isSafeNextPath(value) ? value : fallback;
}

export function withNext(
  href: '/login' | '/signup',
  next?: string | null,
): string {
  if (!isSafeNextPath(next)) return href;
  return `${href}?next=${encodeURIComponent(next)}`;
}

export function loginHref(next?: string | null): string {
  return withNext('/login', next);
}

export function currentPath(pathname: string, search: string): string {
  return `${pathname}${search}`;
}
