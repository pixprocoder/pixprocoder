import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './features/cart/CartSlice';
import { PostApiSlice } from './api/posts/PostApiSlice';
import { UserApiSlice } from './api/user/UserApiSlice';
import { EmailApiSlice } from './api/email/EmailApiSlice';

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    [PostApiSlice.reducerPath]: PostApiSlice.reducer,
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
    [EmailApiSlice.reducerPath]: EmailApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PostApiSlice.middleware,
      UserApiSlice.middleware,
      EmailApiSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
