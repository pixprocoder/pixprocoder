import { configureStore } from "@reduxjs/toolkit";
import { PostApiSlice } from "./api/posts/PostApiSlice";
import CartSlice from "./features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    // comment: CommentSlice,
    [PostApiSlice.reducerPath]: PostApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
