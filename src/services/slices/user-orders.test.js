import {
  startConnecting,
  connectionEstablished,
  connectionClosed,
  receiveAllOrders,
} from "../actions/userOrders";
import { userOrdersSlice } from "./user-orders";

const initialState = {
  isEstablishingConnection: false,
  isConnected: false,
  orders: undefined,
};

const dataReducer = userOrdersSlice.reducer;

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(userOrdersSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("establishing connection with a websockewt server (startConnecting)", () => {
    expect(
      dataReducer(initialState, {
        type: startConnecting,
      })
    ).toEqual({
      ...initialState,
      isEstablishingConnection: true,
    });
  });

  it("connection with a websocket server is established (connectionEstablished)", () => {
    expect(
      dataReducer(initialState, {
        type: connectionEstablished,
      })
    ).toEqual({
      ...initialState,
      isConnected: true,
    });
  });

  it("close the connection with a websocket server (connectionClosed)", () => {
    expect(
      dataReducer(initialState, {
        type: connectionClosed,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("recieve all Orders from websocket server(recieve AllOrders)", () => {
    expect(
      dataReducer(initialState, {
        type: receiveAllOrders,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
