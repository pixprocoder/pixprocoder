import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './features/CounterSlice'
import CommentSlice from './features/CommentSlice'
import CartSlice from './features/cart/CartSlice'

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    cart: CartSlice,
    comment: CommentSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch