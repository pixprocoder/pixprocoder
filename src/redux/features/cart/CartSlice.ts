import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/src/utils/local-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
  price: number;
  itemTotalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

// Helper function to calculate the total price
const calculateTotalPrice = (items: CartItem[]): number => {
  const total = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  return parseFloat(total.toFixed(2));
};

// Load cart state from local storage
const loadCartState = (): CartState => {
  try {
    const serializedState = getFromLocalStorage('cart');
    if (serializedState === null) {
      return { items: [], totalPrice: 0 }; // Return initial state if no saved state exists
    }
    return JSON.parse(serializedState); // Parse the saved state
  } catch (error) {
    console.error('Failed to load cart state from local storage:', error);
    return { items: [], totalPrice: 0 }; // Fallback to initial state on error
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
      if (!state.items) state.items = [];

      const existingItem = state?.items?.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.itemTotalPrice =
          existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          itemTotalPrice: action.payload.price,
        });
      }
      // calculate total price and save to local storage
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },

    // Increment the quantity of an item in the cart
    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.itemTotalPrice =
          existingItem.quantity * existingItem.price;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartState(state);
    },

    // Decrement the quantity of an item in the cart
    decrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.itemTotalPrice =
            existingItem.quantity * existingItem.price;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
        state.totalPrice = calculateTotalPrice(state.items);
        saveCartState(state);
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
