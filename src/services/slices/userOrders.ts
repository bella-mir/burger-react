import { createSlice } from "@reduxjs/toolkit";
import {
  connectionClosed,
  connectionEstablished,
  receiveUserOrders,
  startConnecting,
} from "../actions/userOrders";
import { USER_ORDERS_STATE_KEY } from "../services-constants";
import { IOrdersState } from "../types";

export interface OrdersState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  orders: IOrdersState | undefined;
}

const initialState: OrdersState = {
  isEstablishingConnection: false,
  isConnected: false,
  orders: undefined,
};

export const userOrdersSlice = createSlice({
  name: USER_ORDERS_STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startConnecting, (state) => {
      state.isEstablishingConnection = true;
    });

    builder.addCase(connectionEstablished, (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    });
    builder.addCase(receiveUserOrders, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(connectionClosed, (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    });
  },
});
