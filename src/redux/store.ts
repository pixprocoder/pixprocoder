import { configureStore } from '@reduxjs/toolkit';
import { PostApiSlice } from './api/posts/PostApiSlice';
import CartSlice from './features/cart/CartSlice';
import LikeSlice from './features/post/LikeSlice';
import { UserApiSlice } from './api/user/UserApiSlice';

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    like: LikeSlice,
    // comment: CommentSlice,
    [PostApiSlice.reducerPath]: PostApiSlice.reducer,
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PostApiSlice.middleware,
      UserApiSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
