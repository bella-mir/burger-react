import { createSelector } from "@reduxjs/toolkit";
import { INGREDIENTS_STATE_KEY } from "../ingredients-constants";

const getIngredientsState = (state) => state[INGREDIENTS_STATE_KEY];

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
