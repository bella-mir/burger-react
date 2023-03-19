import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/app-constants";
import { request } from "../../utils/app-utils";
import {
  ILoginProps,
  ISignupProps,
  IUpdatePasswordProps,
  IUserState,
} from "../types";

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ password, token }: IUpdatePasswordProps) => {
    return request(`${API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, name }: ISignupProps) => {
    return request(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILoginProps) => {
    return request(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ refreshToken }: { refreshToken: string | null }) => {
    return request(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  }
);

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
  return request(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
});

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async ({ email, name, password }: IUserState) => {
    return request(`${API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });
  }
);
