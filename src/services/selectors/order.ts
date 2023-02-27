import { createSelector } from "@reduxjs/toolkit";
import { ORDER_STATE_KEY } from "../services-constants";
import { RootState } from "../store";

const getOrderState = (state: RootState) => state[ORDER_STATE_KEY];

export const getOrderNumber = createSelector(
  getOrderState,
  (state) => state.order?.number
);

export const getOrderStatus = createSelector(
  getOrderState,
  (state) => state.status
);
