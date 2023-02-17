import { createSlice } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  logoutUser,
  getUserData,
  updateUserData,
} from "../actions/auth";
import { AUTH_STATE_KEY } from "../services-constants";

export const authSlice = createSlice({
  name: AUTH_STATE_KEY,
  initialState: {
    user: {},
    status: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.user = payload.user;
      state.errorMessage = "";
    },
    [signupUser.pending]: (state) => {
      state.status = "pending";
      state.errorMessage = "";
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.status = "success";
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.status = "pending";
      state.errorMessage = "";
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.user = "";
      state.status = "success";
      state.errorMessage = "";
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload.message;
    },
    [logoutUser.pending]: (state) => {
      state.status = "pending";
      state.errorMessage = "";
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.status = "success";
      state.errorMessage = "";
    },
    [getUserData.rejected]: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload.message;
    },
    [getUserData.pending]: (state) => {
      state.status = "pending";
      state.errorMessage = "";
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.status = "success";
      state.errorMessage = "";
    },
    [updateUserData.rejected]: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload.message;
    },
    [updateUserData.pending]: (state) => {
      state.status = "pending";
      state.errorMessage = "";
    },
  },
});
