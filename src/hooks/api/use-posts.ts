'use client';

import { apiGet, apiPost } from '@/src/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postKeys } from './keys';

export function usePostLikes(slug: string, userId?: string | null) {
  return useQuery({
    queryKey: postKeys.likes(slug, userId),
    queryFn: () => {
      const params = userId ? `?userId=${userId}` : '';
      return apiGet(`/posts/like/${slug}${params}`);
    },
    enabled: Boolean(slug),
  });
}

export function useTogglePostLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: { userId: string; isLiked: boolean };
    }) => apiPost(`/posts/like/${postId}`, data),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: [...postKeys.all, 'likes', vars.postId],
      });
    },
  });
}

export function usePostViews(slug: string) {
  return useQuery({
    queryKey: postKeys.views(slug),
    queryFn: () => apiGet(`/posts/views/${slug}`),
    enabled: Boolean(slug),
  });
}

export function useIncrementPostView() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => apiPost(`/posts/views/${slug}`),
    onSuccess: (_data, slug) => {
      queryClient.invalidateQueries({ queryKey: postKeys.views(slug) });
    },
  });
}

export function useComments(params: {
  slug: string;
  sortBy: string;
  page: number;
  limit: number;
}) {
  const { slug, sortBy, page, limit } = params;
  return useQuery({
    queryKey: postKeys.comments(slug, sortBy, page, limit),
    queryFn: () =>
      apiGet(
        `/posts/comments/${slug}?sortBy=${sortBy}&page=${page}&limit=${limit}`,
      ),
    enabled: Boolean(slug),
  });
}

export function usePostComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string;
      data: { content: string; authorId: string };
    }) => apiPost(`/posts/comments/${slug}`, data),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.commentsRoot(vars.slug),
      });
    },
  });
}
