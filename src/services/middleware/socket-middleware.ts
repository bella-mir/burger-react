import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "../store";

export type TwsActionTypes = {
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TwsActionTypes,
  wsUrl: string
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");

    return (next) => (action) => {
      const wsInit = wsActions.wsConnecting.match(action);
      console.log(`${wsUrl}?token=${token}`);
      if (token && wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      } else if (!token && wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          store.dispatch(wsActions.onOpen());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          store.dispatch(wsActions.onMessage(restParsedData));
        };

        socket.onclose = (event) => {
          store.dispatch(wsActions.onClose());
        };
      }

      next(action);
    };
  };
};
