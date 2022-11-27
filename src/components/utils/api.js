import { API_URL } from "./app-constants";
import { checkResponse } from "./app-utils";

export const getIngerdients = () => {
  return fetch(`${API_URL}/ingredients`).then(checkResponse);
};

export const orderCheckout = (ingredients) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  }).then(checkResponse);
};
