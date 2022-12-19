import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "../services/slices/ingredients";
import { orderSlice } from "../services/slices/order";

export const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
  },
});
