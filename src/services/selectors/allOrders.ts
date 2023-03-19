import { createSelector } from "@reduxjs/toolkit";
import { ORDERS_STATE_KEY } from "../services-constants";
import { RootState } from "../store";

const getOrdersState = (state: RootState) => state[ORDERS_STATE_KEY];

export const getAllOrders = createSelector(
  getOrdersState,
  (state) => state.orders?.orders
);

export const getOrdersTotal = createSelector(
  getOrdersState,
  (state) => state.orders?.total
);

export const getOrdersToday = createSelector(
  getOrdersState,
  (state) => state.orders?.totalToday
);

export const getOrders = createSelector(
  getOrdersState,
  (state) => state.orders?.orders
);

export const getIsEstablishingConnection = createSelector(
  getOrdersState,
  (state) => state.isEstablishingConnection
);
