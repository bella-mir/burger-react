import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  signupUser,
  loginUser,
  logoutUser,
  getUserData,
  updateUserData,
} from "../actions/auth";
import { API_URL } from "../../utils/app-constants";

describe("signup User", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const fakeUser = {
    email: "petrarka222@mail.com",
    password: "xxxxxxxxxx",
    name: "Petrarka",
  };

  const signUpSuccesfullResponse = {
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    success: true,
    user: { email: "petrarka222@mail.com", name: "Petrarka" },
  };

  it("returns the user data when the API call is successful", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(signUpSuccesfullResponse),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ user: {}, status: "" });

    await store.dispatch(signupUser(fakeUser));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: signupUser.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: signupUser.fulfilled.type,
      payload: { ...signUpSuccesfullResponse },
    });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeUser),
    });
  });
});

describe("login User", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const fakeUserLogIn = {
    email: "petrarka222@mail.com",
    password: "xxxxxxxxxx",
  };

  const logInSuccesfullResponse = {
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    success: true,
    user: { email: "petrarka222@mail.com", name: "Petrarka" },
  };

  it("returns the user data when the API call is successful", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(logInSuccesfullResponse),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ user: {}, status: "" });

    await store.dispatch(loginUser(fakeUserLogIn));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: loginUser.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: loginUser.fulfilled.type,
      payload: { ...logInSuccesfullResponse },
    });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeUserLogIn),
    });
  });
});

describe("logout User", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const logout = {
    token: "fhfhfhfhfh",
  };

  it("returns nothing when Api coll is succesfull", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ user: {}, status: "" });

    await store.dispatch(logoutUser(logout));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: logoutUser.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: logoutUser.fulfilled.type,
    });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  });
});

describe("get User Data", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const fakeUser = {
    email: "petyaTheBest@mail.com",
    name: "PetyaM",
  };

  it("returns the user data when the API call is successful", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeUser),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ user: {}, status: "" });

    await store.dispatch(getUserData());
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: getUserData.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: getUserData.fulfilled.type,
      payload: fakeUser,
    });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    });
  });
});

describe("update User Data", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const fakeUser = {
    email: "petyaTheBest@mail.com",
    name: "PetyaM",
    password: "xxxxx",
  };
  const fakeUserResponse = {
    email: "petyaTheBest@mail.com",
    name: "PetyaM",
  };

  it("returns the user data when the API call is successful", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeUserResponse),
      ok: true,
    });
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ user: {}, status: "" });

    await store.dispatch(updateUserData(fakeUser));
    const actions = store.getActions();

    expect(actions[0]).toMatchObject({
      type: updateUserData.pending.type,
      payload: undefined,
    });
    expect(actions[1]).toMatchObject({
      type: updateUserData.fulfilled.type,
      payload: fakeUserResponse,
    });
    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(fakeUser),
    });
  });
});
