import { configureStore } from "@reduxjs/toolkit";
import filter from "./filterSlice";

const store = configureStore({
  reducer: {
    filter,
  },
});

export default store;
