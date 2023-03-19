import { createSlice } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  logoutUser,
  getUserData,
  updateUserData,
} from "../actions/auth";
import { IAuthState } from "../types";
import { AUTH_STATE_KEY } from "../services-constants";

const initialState: IAuthState = {
  user: {},
  status: "",
};

export const authSlice = createSlice({
  name: AUTH_STATE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.status = "success";
      state.user = action.payload.user;
      state.errorMessage = "";
    });
    builder.addCase(signupUser.pending, (state, action) => {
      state.status = "pending";
      state.errorMessage = "";
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.user = action.payload.user;
      state.status = "success";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = {};
      state.errorMessage = "";
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "success";
      state.errorMessage = "";
    });
    builder.addCase(getUserData.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "success";
      state.errorMessage = "";
    });
    builder.addCase(updateUserData.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
