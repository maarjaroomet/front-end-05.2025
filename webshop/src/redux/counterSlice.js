import { createSlice } from '@reduxjs/toolkit'

// function calculateCartSum() {
//     const products = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalPrice = products.reduce((sum, product) => sum + Number(product.price || 0), 0);
//     return totalPrice;
// }

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: (JSON.parse(localStorage.getItem("cart")) || []).length
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
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
    empty: state => {
      state.value = 0
    },
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, empty } = counterSlice.actions

export default counterSlice.reducer