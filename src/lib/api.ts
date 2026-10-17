import { getBaseURL } from '@/src/utils';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getBaseURL()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.message || json?.error || 'Request failed');
  }
  return json as T;
}

export function apiGet<T = any>(path: string) {
  return request<T>(path);
}

export function apiPost<T = any>(
  path: string,
  body?: unknown,
  token?: string | null,
) {
  return request<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
