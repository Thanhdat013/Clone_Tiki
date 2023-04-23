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
  },
});

export default orderSlice.reducer;
export const { doAddBookAction } = orderSlice.actions;
