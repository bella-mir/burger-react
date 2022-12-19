import { createSelector } from "@reduxjs/toolkit";
import { ORDER_STATE_KEY } from "../services-constants";

const getOrderState = (state) => state[ORDER_STATE_KEY];

export const getOrderNumber = createSelector(
  getOrderState,
  (state) => state.order.number
);
