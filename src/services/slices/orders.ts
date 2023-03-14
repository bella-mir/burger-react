import { createSlice } from "@reduxjs/toolkit";
import { ORDERS_STATE_KEY } from "../services-constants";
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

const ordersSlice = createSlice({
  name: ORDERS_STATE_KEY,
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllOrders: (state, action: any) => {
      state.orders = action.payload;
    },
    connectionClosed: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice;
