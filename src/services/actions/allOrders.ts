import { createAction } from "@reduxjs/toolkit";
import { ORDERS_STATE_KEY } from "../services-constants";

export const startConnecting = createAction(
  `${ORDERS_STATE_KEY}/startConnecting`
);

export const connectionEstablished = createAction(
  `${ORDERS_STATE_KEY}/connectionEstablished`
);

export const connectionClosed = createAction(
  `${ORDERS_STATE_KEY}/connectionClosed`
);

export const receiveAllOrders = createAction(
  `${ORDERS_STATE_KEY}/receiveAllOrders`,
  (payload: any) => ({
    payload,
  })
);

export type TLiveOrdersActions =
  | ReturnType<typeof startConnecting>
  | ReturnType<typeof connectionEstablished>
  | ReturnType<typeof connectionClosed>
  | ReturnType<typeof receiveAllOrders>;
