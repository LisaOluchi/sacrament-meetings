import { headers } from 'next/headers';

export async function apiFetch<T>(path: string): Promise<T | null> {
  const host = (await headers()).get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  const response = await fetch(`${protocol}://${host}${path}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as T;
}
