import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "~/utils";

//

const initialState = {
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
  isAuthenticated: false,
  isLoading: true,
};

//  handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // set các giá trị khi đăng nhập thành công
    doLoginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },

    // dùng để fetch lại account khi F5 lại trang
    doFetchAccount: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
});

export const { doLoginAction, doFetchAccount } = usersSlice.actions;
export default usersSlice.reducer;
