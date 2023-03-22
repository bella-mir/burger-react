import { createSelector } from "@reduxjs/toolkit";
import { USER_ORDERS_STATE_KEY } from "../services-constants";
import { RootState } from "../store";

const getOrdersState = (state: RootState) => state[USER_ORDERS_STATE_KEY];

export const getUserOrders = createSelector(
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
