import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "~/redux/reducer/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
