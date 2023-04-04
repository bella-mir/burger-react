import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { postOrder } from "./order";

describe("postOrder", () => {
  const fakeOrderIds = [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733c7",
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns the order data when the API call is successful", async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ order: null, status: "" });

    await store.dispatch(postOrder(fakeOrderIds));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: postOrder.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: postOrder.fulfilled.type,
      payload: { number: expect.any(Number) },
    });
  });
});
