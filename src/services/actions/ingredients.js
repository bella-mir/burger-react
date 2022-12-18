import { createAction } from "@reduxjs/toolkit";
import { INGREDIENTS_STATE_KEY } from "../ingredients-constants";

export const selectIngredient = createAction(
  `${INGREDIENTS_STATE_KEY}/selectIngredient`
);

export const addToConstructor = createAction(
  `${INGREDIENTS_STATE_KEY}/addToConstructor`
);

export const deleteFromConstructor = createAction(
  `${INGREDIENTS_STATE_KEY}/deleteFromConstructor`
);
