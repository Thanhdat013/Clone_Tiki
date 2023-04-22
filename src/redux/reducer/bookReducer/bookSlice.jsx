import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/utils";

//

const initialState = {
  listBooksPaginate: [],
  totalPages: "",

  isLoading: true,
};

export const getAllBookWithPaginate = createAsyncThunk(
  "books/getAllBookWithPaginate",
  async (query) => {
    const response = await axios.get(
      //current=1&pageSize=10?
      `/api/v1/book?${query}`
    );
    return response.data;
  }
);

//  handle actions in your reducers:
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBookWithPaginate.fulfilled, (state, action) => {
      state.listBooksPaginate = action.payload.result;
      state.totalPages = action.payload?.meta?.total;
    });
  },
});

// export const {} = booksSlice.actions;
export default booksSlice.reducer;
