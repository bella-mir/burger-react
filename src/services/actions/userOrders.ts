import { createAction } from "@reduxjs/toolkit";
import { USER_ORDERS_STATE_KEY } from "../services-constants";

export const startConnecting = createAction(
  `${USER_ORDERS_STATE_KEY}/startConnecting`
);

export const connectionEstablished = createAction(
  `${USER_ORDERS_STATE_KEY}/connectionEstablished`
);

export const connectionClosed = createAction(
  `${USER_ORDERS_STATE_KEY}/connectionClosed`
);

export const receiveUserOrders = createAction(
  `${USER_ORDERS_STATE_KEY}/receiveUserOrders`,
  (payload: any) => ({
    payload,
  })
);

export type TLiveOrdersActions =
  | ReturnType<typeof startConnecting>
  | ReturnType<typeof connectionEstablished>
  | ReturnType<typeof connectionClosed>
  | ReturnType<typeof receiveUserOrders>;
