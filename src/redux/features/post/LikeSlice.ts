import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLiked:
    typeof window !== 'undefined' && localStorage.getItem('isLiked') !== null
      ? JSON.parse(localStorage.getItem('isLiked')!)
      : false,
};
const LikeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toggleLike: (state) => {
      state.isLiked = !state.isLiked;
      localStorage.setItem('isLiked', JSON.stringify(state.isLiked));
    },
    setLike: (state, action) => {
      state.isLiked = action.payload;
      localStorage.setItem('isLiked', JSON.stringify(action.payload));
    },
  },
});

export const { toggleLike, setLike } = LikeSlice.actions;

export default LikeSlice.reducer;
