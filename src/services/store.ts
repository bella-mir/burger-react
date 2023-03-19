import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./slices/ingredients";
import { orderSlice } from "./slices/order";
import { authSlice } from "./slices/auth";
import { socketMiddleware } from "./middleware/socket-middleware";
import { allOrdersSlice } from "./slices/allOrders";
import {
  startConnecting as allOrdersWsConnecting,
  connectionEstablished as allOrdersWsConnect,
  receiveAllOrders as allOrdersWsMessage,
  connectionClosed as allOrdersWsClose,
} from "./actions/allOrders";
import {
  startConnecting as userOrdersWsConnecting,
  connectionEstablished as userOrdersWsConnect,
  receiveUserOrders as userOrdersWsMessage,
  connectionClosed as userOrdersWsClose,
} from "./actions/userOrders";
import { userOrdersSlice } from "./slices/userOrders";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlUser = "wss://norma.nomoreparties.space/orders";

const wsActionsAllOrders = {
  wsConnecting: allOrdersWsConnecting,
  onOpen: allOrdersWsConnect,
  onClose: allOrdersWsClose,
  onMessage: allOrdersWsMessage,
};

const wsActionsUserOrders = {
  wsConnecting: userOrdersWsConnecting,
  onOpen: userOrdersWsConnect,
  onClose: userOrdersWsClose,
  onMessage: userOrdersWsMessage,
};

const allOrdersMiddleware = socketMiddleware(wsActionsAllOrders, wsUrl);
const userOrdersMiddleware = socketMiddleware(wsActionsUserOrders, wsUrlUser);

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [allOrdersSlice.name]: allOrdersSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(
      allOrdersMiddleware,
      userOrdersMiddleware
    );
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
