import { createSlice } from '@reduxjs/toolkit'
import type { CartProduct } from '../models/CartProduct';

function calculateCartCount() {
    const products: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    return products.reduce((sum, cp) => sum + Number(cp.quantity || 0), 0);
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: calculateCartCount()
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload
    },
    empty: state => {
      state.value = 0
    },
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, empty, decrementByAmount } = counterSlice.actions

export default counterSlice.reducer