import { createSelector } from "@reduxjs/toolkit";
import { INGREDIENTS_STATE_KEY } from "../services-constants";
import { RootState } from "../store";

const getIngredientsState = (state: RootState) => state[INGREDIENTS_STATE_KEY];

export const getAllIngredients = createSelector(
  getIngredientsState,
  (state) => state.data
);

export const getStatus = createSelector(
  getIngredientsState,
  (state) => state.status
);

export const getSelectedIngredient = createSelector(
  getIngredientsState,
  (state) => state.selectedIngredient
);

export const getIngredientsInConstructor = createSelector(
  getIngredientsState,
  (state) => state.ingredientsInConstructor
);

export const getCountIngredients = (
  id: string,
  type: "bun" | "main" | "sauce"
) =>
  createSelector(getIngredientsState, (state) => {
    if (type !== "bun") {
      return state.ingredientsInConstructor.ingredients?.filter(
        (ingredient) => ingredient._id === id
      ).length;
    } else {
      return state?.ingredientsInConstructor?.bun?._id === id ? 2 : 0;
    }
  });
