import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/app-constants";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, name }, thunkAPI) => {
    const response = await fetch(`${API_URL}/auth/register`, {
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
    let data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return { ...data, name: name, email: email };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const response = await fetch(`${API_URL}/auth/login`, {
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
    let data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ refreshToken }, thunkAPI) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (thunkAPI) => {
    const response = await fetch(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async ({ email, name, password }, thunkAPI) => {
    const response = await fetch(`${API_URL}/auth/user`, {
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
    let data = await response.json();
    if (response.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
