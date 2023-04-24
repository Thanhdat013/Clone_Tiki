import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/utils";

const initialState = {
  carts: [],
};

//  handle actions in your reducers:
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // set các giá trị khi order
    doAddBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      let isExistedId = carts?.findIndex((c) => c._id === item._id);

      if (isExistedId > -1) {
        carts[isExistedId].quantity =
          +carts[isExistedId].quantity + item.quantity;
        // set lại số lượng khi đặt vượt quá số lượng sản phẩm hiện có
        const quantityRemain =
          carts[isExistedId].detail.quantity -
          carts[isExistedId].detail.sold -
          carts[isExistedId].quantity;
        console.log(quantityRemain);
        if (carts[isExistedId].quantity > +quantityRemain) {
          carts[isExistedId].quantity = +quantityRemain;
        }
      } else {
        carts.push({
          quantity: item.quantity,
          _id: item._id,
          detail: item.detail,
        });
      }
      // update redux
      state.carts = carts;
    },
    doUpdateBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      let isExistedId = carts?.findIndex((c) => c._id === item._id);

      if (isExistedId > -1) {
        carts[isExistedId].quantity = item.quantity;
        // set lại số lượng khi đặt vượt quá số lượng sản phẩm hiện có
        const quantityRemain =
          carts[isExistedId].detail.quantity -
          carts[isExistedId].detail.sold -
          carts[isExistedId].quantity;

        if (carts[isExistedId].quantity > +quantityRemain) {
          carts[isExistedId].quantity = +quantityRemain;
        }
      }

      state.carts = carts;
    },

    doDeleteBookAction: (state, action) => {
      state.carts = state.carts.filter((c) => c._id !== action.payload._id);
    },
    doOrderBookAction: (state, action) => {
      state.carts = [];
    },
  },
});

export default orderSlice.reducer;
export const {
  doAddBookAction,
  doUpdateBookAction,
  doDeleteBookAction,
  doOrderBookAction,
} = orderSlice.actions;
