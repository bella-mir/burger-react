import { API_URL } from "./app-constants";
import { request } from "./app-utils";

export const loadIngerdients = () => {
  return request(`${API_URL}/ingredients`);
};

export const orderCheckout = (ingredients) => {
  return request(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const resetPassword = (email) => {
  return request(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const updatePassword = ({ password, token }) => {
  return request(`${API_URL}/reset-password`, {
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
