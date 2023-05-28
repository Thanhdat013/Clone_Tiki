import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  carts: [],
}

//  handle actions in your reducers:
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // set các giá trị khi order
    doAddCartAction: (state, action) => {
      let carts = state.carts
      const item = action.payload
      let isExistedId = carts?.findIndex((c) => c._id === item._id)

      if (isExistedId > -1) {
        carts[isExistedId].quantity =
          +carts[isExistedId].quantity + item.quantity
        // set lại số lượng khi đặt vượt quá số lượng sản phẩm hiện có
        const quantityRemain =
          carts[isExistedId].detail.quantity - carts[isExistedId].quantity
        if (carts[isExistedId].quantity > +quantityRemain) {
          carts[isExistedId].quantity = +quantityRemain
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        })
      }
      // update redux
      state.carts = carts
    },
    doUpdateCartAction: (state, action) => {
      let carts = state.carts
      const item = action.payload
      let isExistedId = carts?.findIndex((c) => c._id === item._id)

      if (isExistedId > -1) {
        carts[isExistedId].quantity = item.quantity
        // set lại số lượng khi đặt vượt quá số lượng sản phẩm hiện có
        const quantityRemain =
          carts[isExistedId].detail.quantity - carts[isExistedId].quantity

        if (carts[isExistedId].quantity > +quantityRemain) {
          carts[isExistedId].quantity = +quantityRemain
        }
      }

      state.carts = carts
    },

    doDeleteCartAction: (state, action) => {
      state.carts = state.carts.filter((c) => c._id !== action.payload._id)
    },
    doOrderCartAction: (state, action) => {
      state.carts = []
    },
    doClearCartAction: (state, action) => {
      state.carts = []
    },
  },
})

export default orderSlice.reducer
export const {
  doAddCartAction,
  doUpdateCartAction,
  doDeleteCartAction,
  doOrderCartAction,
  doClearCartAction,
} = orderSlice.actions
