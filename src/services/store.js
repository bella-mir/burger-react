import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./slices/ingredients";
import { orderSlice } from "./slices/order";

export const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
  },
});
