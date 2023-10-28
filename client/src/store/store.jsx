import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import recipeSlice from "./slices/recipeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    recipe: recipeSlice,
  },
});

export default store;
