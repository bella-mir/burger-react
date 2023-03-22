import { IUpdatePasswordProps } from "../services/types";
import { API_URL } from "./app-constants";
import { checkResponse, request } from "./app-utils";

export const loadIngerdients = () => {
  return request(`${API_URL}/ingredients`);
};

export const orderCheckout = (ingredients: string[]) => {
  return request(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const getOrderDetails = (orderNumber: string) => {
  return request(`${API_URL}/orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const resetPassword = (email: string) => {
  return request(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const updatePassword = ({ password, token }: IUpdatePasswordProps) => {
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
};

export const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
