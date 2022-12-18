import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "../services/slices/ingredients";

export const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
  },
});
