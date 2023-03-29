import React from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { OrderCard } from "../pages/FeedPage/components/OrderCrad";
import { store } from "../services/store";

describe("Check Card component", () => {
  let order = {
    createdAt: "2023-03-29T03:12:23.464Z",
    ingredients: [
      "60d3b41abdacab0026a733c7",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733c7",
    ],
    name: "Space флюоресцентный бургер",
    number: 46564,
    status: "done",
    updatedAt: "2023-03-29T03:12:23.898Z",
    _id: "6423ac970905fd001b6243d3",
  };

  test("should be equal to snapshot", () => {
    const renderedValue = TestRenderer.create(
      <Provider store={store}>
        <OrderCard order={order} />
      </Provider>
    );
    expect(renderedValue).toMatchSnapshot();
  });

  test("should be equal to shallow snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        {" "}
        <OrderCard order={order} />
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
