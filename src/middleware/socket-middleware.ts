import { Middleware } from "redux";
import { ordersActions } from "../services/slices/allOrders";

const socketMiddleware: Middleware = (store) => {
  const wsUrl = "wss://norma.nomoreparties.space/orders/all";
  let socket: WebSocket | null = null;
  const token = localStorage.getItem("accessToken");

  return (next) => (action) => {
    const wsInit = ordersActions.startConnecting.match(action);

    if (token && wsInit) {
      socket = new WebSocket(`${wsUrl}?token=${token}`);
    } else if (!token && wsInit) {
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
