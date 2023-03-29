import { orderCheckout } from "../utils/api";
import { API_URL } from "../utils/app-constants";

describe("check register function", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should be successful", async () => {
    const regresults = await orderCheckout("ingredients");
    expect(regresults).toEqual({ result: "OK" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should be failed", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: "OK" }),
        status: "500",
      })
    );

    await expect(orderCheckout("ingredients")).rejects.toBe("Error 500");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ingredients: "ingredients",
      }),
    });
  });
});
