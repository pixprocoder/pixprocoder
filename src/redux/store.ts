import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './features/CounterSlice'
import CommentSlice from './features/CommentSlice'
import CartSlice from './features/cart/CartSlice'
import { PostApiSlice } from './api/posts/PostApiSlice'

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    cart: CartSlice,
    comment: CommentSlice,
    [PostApiSlice.reducerPath] : PostApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostApiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch