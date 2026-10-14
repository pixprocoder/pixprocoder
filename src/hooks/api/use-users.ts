'use client';

import { apiGet } from '@/src/lib/api';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from './keys';

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => apiGet('/jwt'),
  });
}
