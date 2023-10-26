import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice
  },
});

export default store;
