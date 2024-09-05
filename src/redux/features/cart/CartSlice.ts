import { createSlice } from "@reduxjs/toolkit";


const initialState = {
     item : ''
}
const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment: (state) => {
            state.item += 1
          },
    }

})

export default CartSlice.reducer 