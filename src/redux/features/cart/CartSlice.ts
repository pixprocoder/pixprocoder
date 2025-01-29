import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/src/utils/local-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Load cart state from local storage
const loadCartState = (): CartState => {
  try {
    const serializedState = getFromLocalStorage('cart');
    if (serializedState === null) {
      return { items: [] }; // Return initial state if no saved state exists
    }
    return JSON.parse(serializedState); // Parse the saved state
  } catch (error) {
    console.error('Failed to load cart state from local storage:', error);
    return { items: [] }; // Fallback to initial state on error
  }
};

// Save cart state to local storage
const saveCartState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    setToLocalStorage('cart', serializedState);
  } catch (error) {
    console.error('Failed to save cart state to local storage:', error);
  }
};

const initialState: CartState = loadCartState();

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state?.items?.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartState(state);
    },
  },
});

export const { addToCart } = CartSlice.actions;

export default CartSlice.reducer;
