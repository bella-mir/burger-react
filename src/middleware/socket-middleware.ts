import { Middleware } from "redux";
import { ordersActions } from "../services/slices/orders";

const socketMiddleware: Middleware = (store) => {
  const wsUrl = "wss://norma.nomoreparties.space/orders/all";
  let socket: WebSocket | null = null;
  const token = localStorage.getItem("accessToken");

  return (next) => (action) => {
    if (token) {
      socket = new WebSocket(`${wsUrl}?token=${token}`);
    } else {
      socket = new WebSocket(`${wsUrl}`);
    }

    if (socket) {
      socket.onopen = (event) => {
        store.dispatch(ordersActions.connectionEstablished());
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        store.dispatch(ordersActions.receiveAllOrders(restParsedData));
      };

      socket.onclose = (event) => {
        store.dispatch(ordersActions.connectionClosed());
      };
    }

    next(action);
  };
};

export default socketMiddleware;
