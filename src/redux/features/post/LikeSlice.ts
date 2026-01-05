import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedPosts:
    typeof window !== 'undefined' && localStorage.getItem('likedPosts') !== null
      ? JSON.parse(localStorage.getItem('likedPosts')!)
      : {},
};

const LikeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    setLike: (state, action) => {
      const { userId, slug, isLiked } = action.payload;

      // ✅ Check FIRST, then set
      if (!state.likedPosts[userId]) {
        state.likedPosts[userId] = {};
      }

      state.likedPosts[userId][slug] = isLiked;

      if (typeof window !== 'undefined') {
        localStorage.setItem('likedPosts', JSON.stringify(state.likedPosts));
      }
    },
    clearAllLikes: (state) => {
      state.likedPosts = {};
      if (typeof window !== 'undefined') {
        localStorage.removeItem('likedPosts');
      }
    },
  },
});

export const { setLike, clearAllLikes } = LikeSlice.actions;
export default LikeSlice.reducer;
