import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/redux/reducer/userReducer";
import bookReducer from "~/redux/reducer/bookReducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    books: bookReducer,
  },
});
