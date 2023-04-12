import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/redux/reducer/userReducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
