'use client';

import { create } from 'zustand';

type LikedPosts = Record<string, Record<string, boolean>>;

type LikeState = {
  likedPosts: LikedPosts;
  setLike: (payload: { userId: string; slug: string; isLiked: boolean }) => void;
  clearAllLikes: () => void;
};

const STORAGE_KEY = 'likedPosts';

const loadLikedPosts = (): LikedPosts => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLikedPosts = (likedPosts: LikedPosts) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likedPosts));
};

export const useLikeStore = create<LikeState>((set, get) => ({
  likedPosts: loadLikedPosts(),
  setLike: ({ userId, slug, isLiked }) => {
    const likedPosts = {
      ...get().likedPosts,
      [userId]: {
        ...(get().likedPosts[userId] || {}),
        [slug]: isLiked,
      },
    };
    saveLikedPosts(likedPosts);
    set({ likedPosts });
  },
  clearAllLikes: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ likedPosts: {} });
  },
}));
