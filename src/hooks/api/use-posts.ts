'use client';

import { auth } from '@/src/firebase/firebase.init';
import { apiGet, apiPost } from '@/src/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postKeys } from './keys';

async function authToken() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error('Sign in required');
  return token;
}

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
    }) =>
      authToken().then((token) => apiPost(`/posts/like/${postId}`, data, token)),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: [...postKeys.all, 'likes', vars.postId],
      });
    },
  });
}

export function usePostBookmark(slug: string, userId?: string | null) {
  return useQuery({
    queryKey: postKeys.bookmark(slug, userId),
    queryFn: () =>
      apiGet(`/posts/bookmark/${encodeURIComponent(slug)}?userId=${userId}`),
    enabled: Boolean(slug && userId),
  });
}

export function useTogglePostBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string;
      data: { userId: string; saved: boolean };
    }) => apiPost(`/posts/bookmark/${encodeURIComponent(slug)}`, data),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: [...postKeys.all, 'bookmark', vars.slug],
      });
      queryClient.invalidateQueries({
        queryKey: [...postKeys.all, 'bookmarks'],
      });
    },
  });
}

export function useBookmarkList(userId?: string | null) {
  return useQuery({
    queryKey: postKeys.bookmarkList(userId),
    queryFn: () => apiGet(`/posts/bookmarks?userId=${userId}`),
    enabled: Boolean(userId),
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
  userId?: string | null;
}) {
  const { slug, sortBy, page, limit, userId } = params;
  return useQuery({
    queryKey: postKeys.comments(slug, sortBy, page, limit, userId),
    queryFn: () => {
      const uid = userId ? `&userId=${encodeURIComponent(userId)}` : '';
      return apiGet(
        `/posts/comments/${encodeURIComponent(slug)}?sortBy=${sortBy}&page=${page}&limit=${limit}${uid}`,
      );
    },
    enabled: Boolean(slug),
  });
}

export function useToggleCommentLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: string;
      slug: string;
      data: { userId: string; isLiked: boolean };
    }) =>
      authToken().then((token) =>
        apiPost(`/posts/comments/like/${commentId}`, data, token),
      ),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.commentsRoot(vars.slug),
      });
    },
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
      data: { content: string; parentId?: string | null };
    }) =>
      authToken().then((token) =>
        apiPost(`/posts/comments/${encodeURIComponent(slug)}`, data, token),
      ),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.commentsRoot(vars.slug),
      });
    },
  });
}
