import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./slices/ingredients";
import { orderSlice } from "./slices/order";
import { authSlice } from "./slices/auth";
import socketsMiddleware from "../middleware/socket-middleware";
import ordersSlice from "./slices/orders";

export const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
